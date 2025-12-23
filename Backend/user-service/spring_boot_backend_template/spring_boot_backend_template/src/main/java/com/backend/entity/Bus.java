package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "buses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String busName;     // Volvo, Neeta

    @Column(nullable = false, unique = true)
    private String busNumber;   // MH12AB1234

    @Column(nullable = false)
    private String busType;     // AC, NON_AC, SLEEPER

    @Column(nullable = false)
    private int totalSeats;     // 40, 45
}
