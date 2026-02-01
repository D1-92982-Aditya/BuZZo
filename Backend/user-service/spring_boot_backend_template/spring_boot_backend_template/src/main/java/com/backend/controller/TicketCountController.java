package com.backend.controller;

import com.backend.service.TicketCountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tickets")
public class TicketCountController {

    private final TicketCountService ticketCountService;

    public TicketCountController(TicketCountService ticketCountService) {
        this.ticketCountService = ticketCountService;
    }

    @GetMapping("/count")
    public Long getTotalTicketsCount() {
        return ticketCountService.getTotalTicketsCount();
    }
}
