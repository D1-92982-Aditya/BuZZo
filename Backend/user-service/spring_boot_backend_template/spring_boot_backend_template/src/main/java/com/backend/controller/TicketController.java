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

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
	

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelTicket(@PathVariable Long id) {

        ticketRepository.deleteById(id);

        return ResponseEntity.ok("Ticket cancelled successfully");
    }
    
   

    
    @GetMapping("/myticket")
    public ResponseEntity<List<Ticket>> getMyTickets() {

        System.out.println(">>> TicketController.getMyTickets() HIT <<<");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("AUTH OBJECT = " + auth);

        String email = auth.getName();
        System.out.println("AUTH NAME = " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Ticket> tickets = ticketRepository.findByUser(user);
        return ResponseEntity.ok(tickets);
    }


    
    

    @PostMapping("/success")
    public ResponseEntity<Ticket> paymentSuccess(@RequestBody Ticket ticket) {

        // 1️⃣ Get logged-in user from JWT
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        // 2️⃣ Load User entity
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3️⃣ Attach user & set booking time
        ticket.setUser(user);
        ticket.setBookedAt(LocalDateTime.now());

        // 4️⃣ Save ticket
        Ticket savedTicket = ticketRepository.save(ticket);

        return ResponseEntity.ok(savedTicket);
    }
}
