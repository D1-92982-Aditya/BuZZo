package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "bus_schedules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BusSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fromCity;

    @Column(nullable = false)
    private String toCity;

    @Column(nullable = false)
    private LocalDate journeyDate;

    @Column(nullable = false)
    private LocalTime departureTime;

    @Column(nullable = false)
    private LocalTime arrivalTime;

    @Column(nullable = false)
    private double ticketPrice;

    @ManyToOne
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;
}
