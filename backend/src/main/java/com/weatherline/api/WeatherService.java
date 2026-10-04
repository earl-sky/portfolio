package com.weatherline.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weatherline.api.WeatherDtos.CityWeather;
import com.weatherline.api.WeatherDtos.HourForecast;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

@Service
public class WeatherService {
    private static final String BASE_URL = "https://api.open-meteo.com/v1/forecast";
    private static final Duration CACHE_TTL = Duration.ofMinutes(10);

    private final CityRepository cities;
    private final ObjectMapper mapper;
    private final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(8)).build();
    private volatile CachedForecast cachedForecast;

    private record CachedForecast(Instant fetchedAt, List<CityWeather> cities) { }

    public WeatherService(CityRepository cities, ObjectMapper mapper) {
        this.cities = cities;
        this.mapper = mapper;
    }

    public synchronized List<CityWeather> getAllCities() {
        CachedForecast cached = cachedForecast;
        if (cached != null && cached.fetchedAt().plus(CACHE_TTL).isAfter(Instant.now())) return cached.cities();

        List<City> cityList = cities.findAllByOrderByIdAsc();
        List<CompletableFuture<CityWeather>> requests = cityList.stream().map(this::getWeather).toList();
        try {
            List<CityWeather> forecast = CompletableFuture.allOf(requests.toArray(CompletableFuture[]::new))
                .thenApply(ignored -> requests.stream().map(CompletableFuture::join).toList())
                .join();
            cachedForecast = new CachedForecast(Instant.now(), forecast);
            return forecast;
        } catch (CompletionException exception) {
            if (cached != null) return cached.cities();
            Throwable cause = exception.getCause();
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Weather provider is temporarily unavailable", cause);
        }
    }

    private CompletableFuture<CityWeather> getWeather(City city) {
        String query = "latitude=" + city.getLatitude()
                + "&longitude=" + city.getLongitude()
                + "&current=" + encode("temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m")
                + "&hourly=" + encode("temperature_2m,precipitation_probability,weather_code")
                + "&daily=" + encode("temperature_2m_max,temperature_2m_min")
                + "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=1";
        HttpRequest request = HttpRequest.newBuilder(URI.create(BASE_URL + "?" + query))
                .timeout(Duration.ofSeconds(12))
                .header("Accept", "application/json")
                .GET()
                .build();
        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString()).thenApply(response -> {
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new CompletionException(new IllegalStateException("Forecast provider returned HTTP " + response.statusCode()));
            }
            try {
                return toDto(city, mapper.readTree(response.body()));
            } catch (IOException exception) {
                throw new CompletionException(exception);
            }
        });
    }

    private CityWeather toDto(City city, JsonNode data) {
        JsonNode current = data.path("current");
        JsonNode hourlyData = data.path("hourly");
        JsonNode daily = data.path("daily");
        JsonNode times = hourlyData.path("time");
        JsonNode temperatures = hourlyData.path("temperature_2m");
        JsonNode probabilities = hourlyData.path("precipitation_probability");
        JsonNode codes = hourlyData.path("weather_code");

        String currentTime = current.path("time").asText();
        int start = 0;
        for (int i = 0; i < times.size(); i++) {
            if (times.get(i).asText().compareTo(currentTime) >= 0) { start = i; break; }
        }
        List<HourForecast> hours = new ArrayList<>();
        for (int i = start; i < Math.min(start + 6, times.size()); i++) {
            hours.add(new HourForecast(
                times.get(i).asText(),
                temperatures.get(i).asDouble(),
                codes.get(i).asInt(),
                probabilities.get(i).asInt(0)
            ));
        }

        return new CityWeather(
            city.getSlug(), city.getName(), city.getRegion(),
            current.path("temperature_2m").asDouble(),
            current.path("apparent_temperature").asDouble(),
            current.path("weather_code").asInt(),
            current.path("wind_speed_10m").asDouble(),
            current.path("relative_humidity_2m").asInt(),
            hours.isEmpty() ? 0 : hours.get(0).precipitationChance(),
            daily.path("temperature_2m_max").path(0).asDouble(),
            daily.path("temperature_2m_min").path(0).asDouble(),
            currentTime,
            hours
        );
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
