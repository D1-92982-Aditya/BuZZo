package com.backend.service;

import com.backend.dto.BusRequestDTO;
import com.backend.entity.Bus;
import com.backend.entity.Seat;
import com.backend.repository.BusRepository;
import com.backend.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class BusServiceImpl implements BusService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public Bus addBus(BusRequestDTO dto) {

        // 1️⃣ Validate bus number
    	
        if (busRepository.existsByBusNumber(dto.getBusNumber())) {
            throw new RuntimeException("Bus number already exists");
        }

        // 2️⃣ Create Bus entity
        
        Bus bus = new Bus();
        bus.setBusName(dto.getBusName());
        bus.setBusNumber(dto.getBusNumber());
        bus.setBusType(dto.getBusType());
        bus.setTotalSeats(dto.getTotalSeats());
        

        // 3️⃣ Save bus (ID generated here)
        Bus savedBus = busRepository.save(bus);

        // 4️⃣ Auto-create seats
        
        
        
        List<Seat> seats = new ArrayList<>();

        for (int i = 1; i <= dto.getTotalSeats(); i++) {
            Seat seat = new Seat();
            seat.setSeatNumber(i+"");
            seat.setBus(savedBus);
            seats.add(seat);
        }

        seatRepository.saveAll(seats);

        return savedBus;
    }
}
