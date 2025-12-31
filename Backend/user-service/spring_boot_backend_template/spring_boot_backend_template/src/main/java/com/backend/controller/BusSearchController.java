package com.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.service.BusQueryService;
import com.backend.service.BusScheduleService;
import com.backend.service.BusSearchService;

import lombok.*;

@RestController
@RequestMapping("/buses")
@RequiredArgsConstructor
public class BusSearchController {
	
	

	    private final BusSearchService searchService;
	    private final BusQueryService busQueryService;

	    @PostMapping("/search")
	    public ResponseEntity<List<Long>> getSchedules(
	            @RequestParam String fromCity,
	            @RequestParam String toCity,
	            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	                    LocalDate journeyDate
	    ) {
	        List<Long> scheduleIds =
	                searchService.getScheduleIds(fromCity, toCity, journeyDate);

	        return ResponseEntity.ok(scheduleIds);
	    }
	    
	    
	    
	   

	    @GetMapping("/fetch")
	    public ResponseEntity<?> getBuses(
	            @RequestParam List<Long> scheduleIds) {

	        return ResponseEntity.ok(busQueryService.getBuses(scheduleIds));
	    }
	

}
