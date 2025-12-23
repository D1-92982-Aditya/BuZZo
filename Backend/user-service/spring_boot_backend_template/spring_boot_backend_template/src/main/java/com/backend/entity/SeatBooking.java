package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seat_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Which journey (date + route)
    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private BusSchedule busSchedule;

    // Which seat (1A, 1B, etc.)
    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @Column(nullable = false)
    private boolean booked; // true = seat is booked
}
