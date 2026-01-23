package com.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.BoardingPointRequestDTO;
import com.backend.service.BoardingService;
import com.backend.service.BusSearchService;
import com.backend.service.DroppingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/buses")
@RequiredArgsConstructor
public class DroppingController {

	private final DroppingService droppingService ;
	
	
	@GetMapping("/dropping")
	public ResponseEntity<List<String>> getDroppingPoints(@RequestParam Long schedule_id )
                    
    {
        List<String> droppingList = droppingService.getDroppingPoints(schedule_id);

        return ResponseEntity.ok(droppingList);
    }

	
}
