package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.Seat;
import com.backend.entity.SeatBooking;

import jakarta.transaction.Transactional;

public interface SeatBookingRepository extends JpaRepository<SeatBooking, Long> {
	@Query(value = """
	        SELECT 
	            s.seat_number AS seatNumber,
	            sb.booked AS booked
	        FROM seat_bookings sb
	        JOIN seats s ON s.id = sb.seat_id
	        WHERE sb.schedule_id = :scheduleId
	        
	    """, nativeQuery = true)
	List<Object[]> findSeats(Long scheduleId);
	
	
	
	@Query(value = """
	        SELECT s.seat_number, sb.booked
	        FROM seat_bookings sb
	        JOIN seats s ON sb.seat_id = s.id
	        WHERE sb.schedule_id = :scheduleId
	          AND s.seat_number = :seatNumber
	    """, nativeQuery = true)
	
	
	    List<Object[]> checkSeat(
	            @Param("scheduleId") Long scheduleId,
	            @Param("seatNumber") String seatNumber
	    );

	
	
	    // Step 2: Book seat 
	
	
	    @Modifying
	    @Transactional
	    @Query(value = """
	        UPDATE seat_bookings sb
	        JOIN seats s ON sb.seat_id = s.id
	        SET sb.booked = 1
	        WHERE sb.schedule_id = :scheduleId
	          AND s.seat_number = :seatNumber
	          AND sb.booked = 0
	    """, nativeQuery = true)
	    
	    int bookSeat(
	            @Param("scheduleId") Long scheduleId,
	            @Param("seatNumber") String seatNumber
	    );

}
