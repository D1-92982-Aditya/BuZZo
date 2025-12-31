package com.backend.service;

import java.time.LocalDate;
import java.util.List;

public interface BusSearchService {
	List<Long> getScheduleIds(String fromCity, String toCity, LocalDate journeyDate);

}
