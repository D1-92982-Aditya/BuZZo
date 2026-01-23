package com.backend.service;

import com.backend.dto.BusScheduleDTO;
import com.backend.dto.BoardingPointRequestDTO;
import com.backend.dto.DroppingPointRequestDTO;
import com.backend.entity.*;
import com.backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusScheduleImpl implements BusScheduleService {

    private final BusRepository busRepo;
    private final BusScheduleRepository scheduleRepo;
    private final SeatRepository seatRepo;
    private final SeatBookingRepository seatBookingRepo;
    private final BoardingPointRepository boardingRepo;
    private final DroppingPointRepository droppingRepo;

    @Transactional
    public BusSchedule createSchedule(BusScheduleDTO req) {

        /* 1️⃣ Fetch Bus */
    	
    	
        Bus bus = busRepo.findById(req.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        /* 2️⃣ Insert into bus_schedules */
        
        
        
        BusSchedule schedule = new BusSchedule();
        schedule.setFromCity(req.getFromCity());
        schedule.setToCity(req.getToCity());
        schedule.setJourneyDate(req.getJourneyDate());
        schedule.setDepartureTime(req.getDepartureTime());
        schedule.setArrivalTime(req.getArrivalTime());
        schedule.setTicketPrice(req.getTicketPrice());
        schedule.setBus(bus);

        schedule = scheduleRepo.save(schedule);
        

        /* 3️⃣ Create seat_bookings for ALL seats */
        
        
        
        List<Seat> seats = seatRepo.findByBus(bus);

        for (Seat seat : seats) {
            SeatBooking sb = new SeatBooking();
            sb.setBusSchedule(schedule);
            sb.setSeat(seat);
            sb.setBooked(false);
            seatBookingRepo.save(sb);
        }

        /* 4️⃣ Boarding Points */
        
        
        if (req.getBoardingPoints() != null) {
            for (BoardingPointRequestDTO bpReq : req.getBoardingPoints()) {
                BoardingPoint bp = new BoardingPoint();
                bp.setLocationName(bpReq.getLocationName());
                bp.setBoardingTime(bpReq.getBoardingTime());
                bp.setBusSchedule(schedule);
                boardingRepo.save(bp);
            }
        }

        /* 5️⃣ Dropping Points */
        
        
        if (req.getDroppingPoints() != null) {
            for (DroppingPointRequestDTO dpReq : req.getDroppingPoints()) {
                DroppingPoint dp = new DroppingPoint();
                dp.setLocationName(dpReq.getLocationName());
                dp.setDroppingTime(dpReq.getDroppingTime());
                dp.setBusSchedule(schedule);
                droppingRepo.save(dp);
            }
        }

        return schedule;
    }

	@Override
	public List<BusSchedule> searchSchedules(String fromCity, String toCity, String journeyDate) {
	    // Convert journeyDate from String to LocalDate
	    LocalDate date;
	    try {
	        date = LocalDate.parse(journeyDate); // expects yyyy-MM-dd
	    } catch (Exception e) {
	        throw new IllegalArgumentException("Invalid date format. Use yyyy-MM-dd");
	    }

	    // Query repository for matching schedules
	    List<BusSchedule> schedules = scheduleRepo.findByFromCityAndToCityAndJourneyDate(fromCity, toCity, date);

	    // Force load boarding & dropping points (if LAZY)
	    schedules.forEach(bus -> {
	        if (bus.getBoardingPoints() != null) bus.getBoardingPoints().size();
	        if (bus.getDroppingPoints() != null) bus.getDroppingPoints().size();
	    });

	    return schedules;
	}

}
