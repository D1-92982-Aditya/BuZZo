package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dto.SeatAvailabilityDTO;
import com.backend.repository.SeatBookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {
	private final SeatBookingRepository seatBookingRepo;

    public List<SeatAvailabilityDTO> getSeats(Long scheduleId) {

        List<Object[]> rows = seatBookingRepo.findSeats(scheduleId);

        return rows.stream()
                .map(r -> new SeatAvailabilityDTO(
                        r[0].toString(),
                        ((Boolean) r[1])
                ))
                .toList();
    }
    
    
    
    public String bookSeat(Long scheduleId, String seatNumber) {

    	List<Object[]> result = seatBookingRepo.checkSeat(scheduleId, seatNumber);

        if (result.isEmpty()) {
            throw new RuntimeException("Seat not found");
        }

        Object[] row = result.get(0);

        String seatNo = row[0].toString();

        Object bookedObj = row[1];
        boolean booked;

        if (bookedObj instanceof Boolean) {
            booked = (Boolean) bookedObj;
        } else {
            booked = ((Number) bookedObj).intValue() == 1;
        }

        if (booked) {
            throw new RuntimeException("Seat already booked");
        }

        int updated = seatBookingRepo.bookSeat(scheduleId, seatNumber);
        if (updated == 0) {
            throw new RuntimeException("Seat booking failed (already booked)");
        }

        return "Seat " + seatNo + " booked successfully";
}
}
