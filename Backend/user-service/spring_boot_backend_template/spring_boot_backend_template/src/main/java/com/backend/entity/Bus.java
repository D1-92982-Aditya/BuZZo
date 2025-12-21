package com.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String busName;
    private String busType;
 
    private LocalDate availDate;
    private String fromCity;
    private String toCity;

    private String departureTime;
    private double ticketPrice;
    private int totalSeats;
}
