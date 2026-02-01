package com.backend.controller;

import com.backend.service.CityConnectedCountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CityConnectedCountController {

    private final CityConnectedCountService cityConnectedCountService;

    public CityConnectedCountController(
            CityConnectedCountService cityConnectedCountService) {
        this.cityConnectedCountService = cityConnectedCountService;
    }

    @GetMapping("/cities/connected/count")
    public ResponseEntity<Long> getCityConnectedCount() {
        return ResponseEntity.ok(
                cityConnectedCountService.getCityConnectedCount()
        );
    }
}
