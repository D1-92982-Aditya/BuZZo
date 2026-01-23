package com.backend.service;

import java.time.LocalDate;
import java.util.List;

import com.backend.entity.BusSchedule;

public interface BusSearchService {
	List<Long> getScheduleIds(String fromCity, String toCity, LocalDate journeyDate);

	List<BusSchedule> searchSchedules(String fromCity, String toCity, LocalDate journeyDate);

}
