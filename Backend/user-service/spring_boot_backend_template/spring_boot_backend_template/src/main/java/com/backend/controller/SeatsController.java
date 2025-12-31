package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.SeatAvailabilityDTO;
import com.backend.service.BoardingService;
import com.backend.service.SeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/buses")
@RequiredArgsConstructor
public class SeatsController {

	private final SeatService seatService;
	@GetMapping("/seats/{scheduleId}")
	public ResponseEntity<List<SeatAvailabilityDTO>> getSeats(
	        @PathVariable Long scheduleId) {

	    return ResponseEntity.ok(seatService.getSeats(scheduleId));
	}
	
	
	@PutMapping("/book-seat")
	public ResponseEntity<String> bookSeat(
	        @RequestParam Long scheduleId,
	        @RequestParam String seatNumber
	) {
	    return ResponseEntity.ok(
	            seatService.bookSeat(scheduleId, seatNumber)
	    );
	}
}
