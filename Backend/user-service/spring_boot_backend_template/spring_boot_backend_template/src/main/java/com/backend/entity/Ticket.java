package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Logged-in user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 🔗 Bus Schedule
    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private BusSchedule busSchedule;

    @Column(nullable = false)
    private String bookingId;

    @Column(nullable = false)
    private String passengerNames; // "Aditya"

    @Column(nullable = false)
    private String seatNumbers; // "3C, 3D"

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private LocalDate journeyDate;

    
    private LocalDateTime bookedAt;
}
