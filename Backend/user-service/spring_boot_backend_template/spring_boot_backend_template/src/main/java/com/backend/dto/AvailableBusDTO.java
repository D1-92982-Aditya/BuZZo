package com.backend.dto;


import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AvailableBusDTO {

    
    private Long busId;
    private String busName;
    private String busType;
    private String fromCity;
    private String toCity;
    private Date journeyDate;
    private Double ticketPrice;
    private Long availableSeats;
}
