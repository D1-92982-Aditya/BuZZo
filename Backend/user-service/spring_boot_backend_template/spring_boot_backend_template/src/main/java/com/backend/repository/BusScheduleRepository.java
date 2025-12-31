package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.dto.AvailableBusDTO;
import com.backend.entity.BusSchedule;

public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {

	@Query
	(value = "CALL get_buses_by_schedule_ids(:scheduleIds)", nativeQuery = true)
    List<AvailableBusDTO[]> getBusesByScheduleIds(@Param("scheduleIds") String scheduleIds);
	

}
