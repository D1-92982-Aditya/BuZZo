package com.backend.service;

import com.backend.repository.TicketRepository;
import com.backend.service.TicketCountService;
import org.springframework.stereotype.Service;

@Service
public class TicketCountServiceImpl implements TicketCountService {

    private final TicketRepository ticketRepository;

    public TicketCountServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Long getTotalTicketsCount() {
        return ticketRepository.count();
    }
}
