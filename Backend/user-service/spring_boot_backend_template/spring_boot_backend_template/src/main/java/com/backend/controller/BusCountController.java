package com.backend.controller;

import com.backend.service.BusCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/buses")
@RequiredArgsConstructor
public class BusCountController {

    private final BusCountService busCountService;

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getTotalBusCount() {
        return ResponseEntity.ok(
                Map.of("totalBuses", busCountService.getTotalBusCount())
        );
    }
}
