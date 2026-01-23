package com.backend.controller;

import com.backend.dto.*;
import com.backend.entity.BusSchedule;
import com.backend.service.BusScheduleService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buses/schedules")
@RequiredArgsConstructor
public class BusSchedulerController {

    private final BusScheduleService scheduleService;

    // Create schedule
    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody BusScheduleDTO request) {
        BusSchedule schedule = scheduleService.createSchedule(request);
        return ResponseEntity.ok(schedule);
    }

    // Search schedules
    @GetMapping("/search")
    public ResponseEntity<?> searchSchedules(
            @RequestParam String fromCity,
            @RequestParam String toCity,
            @RequestParam String journeyDate) {

        try {
            List<BusSchedule> schedules = scheduleService.searchSchedules(fromCity, toCity, journeyDate);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            e.printStackTrace(); // logs error to console
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

}
