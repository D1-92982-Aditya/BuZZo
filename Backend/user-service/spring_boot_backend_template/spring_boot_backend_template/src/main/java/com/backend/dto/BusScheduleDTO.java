package com.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class BusScheduleDTO {

    private Long busId;

    private String fromCity;
    private String toCity;
    private LocalDate journeyDate;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private double ticketPrice;

    private List<BoardingPointRequestDTO> boardingPoints;
    private List<DroppingPointRequestDTO> droppingPoints;
}
