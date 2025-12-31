package com.backend.repository;

import com.backend.entity.Bus;
import com.backend.entity.Seat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
	List<Seat> findByBus(Bus bus);
}
