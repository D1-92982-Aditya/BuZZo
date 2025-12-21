package com.backend.controller;

import com.backend.entity.Bus;
import com.backend.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping("/search")
    public ResponseEntity<?> getBus(
            @RequestParam String from,
            @RequestParam String to) {

        List<Bus> buses = busService.findBusescitytocity(from, to);
        System.out.println(buses);
        return ResponseEntity.ok(buses);
    }
    @GetMapping("/allbuses")
    public ResponseEntity<?> AllgetBus(
            @RequestParam String from,
            @RequestParam String to) {

        List<Bus> buses = busService.Allbus();
        System.out.println(buses);
        return ResponseEntity.ok(buses);
    }
}
