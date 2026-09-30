package com.weatherline.api;

import java.util.List;

public final class WeatherDtos {
    private WeatherDtos() { }

    public record HourForecast(String time, double temperature, int weatherCode, int precipitationChance) { }

    public record CityWeather(
        String slug,
        String name,
        String region,
        double temperature,
        double feelsLike,
        int weatherCode,
        double windSpeed,
        int humidity,
        int precipitationChance,
        double high,
        double low,
        String localTime,
        List<HourForecast> hourly
    ) { }
}
