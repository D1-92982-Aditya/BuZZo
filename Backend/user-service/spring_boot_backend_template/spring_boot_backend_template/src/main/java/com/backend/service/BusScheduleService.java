package com.backend.service;

import java.time.LocalDate;
import java.util.List;

import com.backend.dto.BusScheduleDTO;
import com.backend.entity.BusSchedule;

public interface BusScheduleService {
	BusSchedule createSchedule(BusScheduleDTO req);

	

}
