
package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatAvailabilityDTO {

    private String seatNumber;
    private boolean booked;
}
