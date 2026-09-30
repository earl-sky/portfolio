package com.weatherline.api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CitySeeder implements CommandLineRunner {
    private final CityRepository cities;

    public CitySeeder(CityRepository cities) {
        this.cities = cities;
    }

    @Override
    public void run(String... args) {
        for (City city : List.of(
            new City("las-vegas", "Las Vegas", "Nevada", 36.1699, -115.1398),
            new City("san-francisco", "San Francisco", "California", 37.7749, -122.4194),
            new City("palo-alto", "Palo Alto", "California", 37.4419, -122.1430),
            new City("seattle", "Seattle", "Washington", 47.6062, -122.3321),
            new City("dallas", "Dallas", "Texas", 32.7767, -96.7970),
            new City("tampa", "Tampa", "Florida", 27.9506, -82.4572),
            new City("dededo", "Dededo", "Guam", 13.5178, 144.8391),
            new City("baguio-city", "Baguio City", "Philippines", 16.4023, 120.5960)
        )) {
            if (!cities.existsBySlug(city.getSlug())) cities.save(city);
        }
    }
}
