package com.backend.repository;

import com.backend.entity.Ticket;
import com.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
	List<Ticket> findByUser(User user);

  
}
