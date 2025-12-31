package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusRequestDTO {

    private String busName;
    private String busNumber;
    private String busType;
    private int totalSeats;
}
