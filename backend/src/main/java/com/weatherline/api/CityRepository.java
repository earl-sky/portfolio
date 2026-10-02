package com.weatherline.api;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findAllByOrderByIdAsc();
    boolean existsBySlug(String slug);
    Optional<City> findBySlug(String slug);
}
