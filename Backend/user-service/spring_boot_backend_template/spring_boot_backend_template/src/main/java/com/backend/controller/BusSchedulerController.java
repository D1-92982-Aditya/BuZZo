package com.backend.controller;

import com.backend.dto.*;
import com.backend.entity.BusSchedule;
import com.backend.service.BusScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buses/schedules")
@RequiredArgsConstructor
public class BusSchedulerController {

    private final BusScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> createSchedule(
            @RequestBody BusScheduleDTO request) {

        BusSchedule schedule = scheduleService.createSchedule(request);
        return ResponseEntity.ok(schedule);
    }
}
