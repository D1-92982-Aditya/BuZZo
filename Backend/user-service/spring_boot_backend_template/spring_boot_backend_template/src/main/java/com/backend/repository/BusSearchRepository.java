package com.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.BusSchedule;

public interface BusSearchRepository extends JpaRepository<BusSchedule, Long> {

	@Query("""
	        SELECT bs.id
	        FROM BusSchedule bs
	        WHERE bs.fromCity = :fromCity
	          AND bs.toCity = :toCity
	          AND bs.journeyDate = :journeyDate
	    """)
	    List<Long> findScheduleIds(
	        @Param("fromCity") String fromCity,
	        @Param("toCity") String toCity,
	        @Param("journeyDate") LocalDate journeyDate
	    );

}
