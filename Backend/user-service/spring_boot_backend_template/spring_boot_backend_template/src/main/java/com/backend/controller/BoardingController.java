package com.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.BoardingPointRequestDTO;
import com.backend.service.BoardingService;
import com.backend.service.BusSearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/buses")
@RequiredArgsConstructor
public class BoardingController {

	private final BoardingService boardingService ;
	
	
	@GetMapping("/boarding")
	public ResponseEntity<List<String>> getBoardingPoints(@RequestParam Long schedule_id )
                    
    {
        List<String> boardingList = boardingService.getBoardingPoints(schedule_id);

        return ResponseEntity.ok(boardingList);
    }

	
}
