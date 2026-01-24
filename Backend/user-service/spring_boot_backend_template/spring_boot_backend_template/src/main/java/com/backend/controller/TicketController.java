package com.backend.controller;

import com.backend.entity.Ticket;
import com.backend.entity.User;
import com.backend.repository.TicketRepository;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    // 🔐 SUCCESS PAYMENT API
    @PostMapping("/success")
    public ResponseEntity<?> paymentSuccess(@RequestBody Ticket ticket) {

        // ✅ 1️⃣ GET LOGGED-IN USER
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();
        

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        String email = auth.getName(); // comes from JWT

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + email));

        // ✅ 2️⃣ ATTACH USER TO TICKET
        ticket.setUser(user);

        // ✅ 3️⃣ SAVE TICKET
        Ticket savedTicket = ticketRepository.save(ticket);
        

        return ResponseEntity.ok(savedTicket);
    }
}
