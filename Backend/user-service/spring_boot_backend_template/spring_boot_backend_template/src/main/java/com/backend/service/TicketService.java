package com.backend.service;

import com.backend.dto.TicketRequestDTO;
import com.backend.entity.*;
import com.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final BusScheduleRepository busScheduleRepository;

    public Ticket saveTicket(TicketRequestDTO dto, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BusSchedule schedule = busScheduleRepository.findById(dto.getScheduleId())
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setBusSchedule(schedule);
        ticket.setBookingId(dto.getBookingId());
        ticket.setPassengerNames(String.join(", ", dto.getPassengerNames()));
        ticket.setSeatNumbers(String.join(", ", dto.getSeatNumbers()));
        ticket.setTotalAmount(dto.getTotalAmount());
        ticket.setJourneyDate(dto.getJourneyDate());
        ticket.setBookedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ticketRepository.findByUser(user);
    }
}
