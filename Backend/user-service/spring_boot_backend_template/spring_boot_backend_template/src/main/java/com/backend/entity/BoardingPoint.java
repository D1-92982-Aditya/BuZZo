package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "boarding_points")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardingPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String locationName;   // Wakad, Hinjewadi, Shivajinagar

    @Column(nullable = false)
    private LocalTime boardingTime;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private BusSchedule busSchedule;
}
