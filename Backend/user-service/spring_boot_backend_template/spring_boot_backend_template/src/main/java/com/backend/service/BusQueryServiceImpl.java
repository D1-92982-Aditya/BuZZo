package com.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.dto.AvailableBusDTO;
import com.backend.repository.BusScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusQueryServiceImpl implements BusQueryService {
	
	

	    private final BusScheduleRepository repo;

	    public List<AvailableBusDTO[]> getBuses(List<Long> scheduleIds) {
	        String ids = scheduleIds.stream()
	                .map(String::valueOf)
	                .collect(Collectors.joining(","));
	        return repo.getBusesByScheduleIds(ids);
	    
	}

}
