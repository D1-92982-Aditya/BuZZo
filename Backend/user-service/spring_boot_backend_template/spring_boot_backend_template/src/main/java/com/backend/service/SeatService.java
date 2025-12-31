package com.backend.service;

import java.util.List;

import com.backend.dto.SeatAvailabilityDTO;

public interface SeatService {

	List<SeatAvailabilityDTO> getSeats(Long scheduleId);

	String bookSeat(Long scheduleId, String seatNumber);

}
