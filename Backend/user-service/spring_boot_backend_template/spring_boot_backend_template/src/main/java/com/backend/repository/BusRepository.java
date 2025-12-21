package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Long> {

    List<Bus> findByFromCityAndToCity(String fromCity, String toCity);
}
