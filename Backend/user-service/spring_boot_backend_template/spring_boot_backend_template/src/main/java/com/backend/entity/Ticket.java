package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(nullable = false, unique = true)
    private String bookingId;

    @Column(nullable = false)
    private String passengerName;

    @Column(nullable = false)
    private String fromCity;

    @Column(nullable = false)
    private String toCity;

    @Column(nullable = false)
    private LocalDate journeyDate;

    @Column(nullable = false)
    private String seatNumber;

    private LocalDateTime bookedAt;

    // 🔐 Logged-in user (JWT)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

}

