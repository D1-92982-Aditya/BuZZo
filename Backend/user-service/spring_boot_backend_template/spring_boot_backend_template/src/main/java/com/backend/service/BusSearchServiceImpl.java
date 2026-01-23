package com.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.entity.BusSchedule;
import com.backend.repository.BusSearchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class BusSearchServiceImpl implements BusSearchService {

	
	private final BusSearchRepository busSearchRepository;
	@Override
	public List<Long> getScheduleIds(String fromCity, String toCity, LocalDate journeyDate) {
		// TODO Auto-generated method stub
		return busSearchRepository.findScheduleIds(fromCity,toCity,journeyDate);
	}
	
	public List<BusSchedule> searchSchedules(
	        String fromCity, String toCity, LocalDate journeyDate) {

	    return busSearchRepository
	            .findByFromCityAndToCityAndJourneyDate(
	                    fromCity, toCity, journeyDate);
	}


}
