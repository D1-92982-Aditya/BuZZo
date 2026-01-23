package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "dropping_points")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DroppingPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String locationName;   // Andheri, Dadar, Borivali

    @Column(nullable = false)
    private LocalTime droppingTime;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "schedule_id", nullable = false)
    private BusSchedule busSchedule;
}
