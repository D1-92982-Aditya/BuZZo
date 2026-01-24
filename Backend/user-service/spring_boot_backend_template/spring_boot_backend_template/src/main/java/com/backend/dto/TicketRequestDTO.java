package com.backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketRequestDTO {

    private Long scheduleId;
    private String bookingId;
    private List<String> passengerNames;
    private List<String> seatNumbers;
    private double totalAmount;
    private LocalDate journeyDate;
}
