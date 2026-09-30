package com.weatherline.api;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findAllByOrderByIdAsc();
    boolean existsBySlug(String slug);
}
