package com.backend.repository;

import com.backend.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepository extends JpaRepository<Bus, Long> {

    boolean existsByBusNumber(String busNumber);
}
