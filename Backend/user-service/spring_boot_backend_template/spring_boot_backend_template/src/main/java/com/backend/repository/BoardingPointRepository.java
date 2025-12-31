package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.dto.BoardingPointRequestDTO;
import com.backend.entity.BoardingPoint;

public interface BoardingPointRepository extends JpaRepository<BoardingPoint, Long> {

	@Query
	("""
	        SELECT bp.locationName
	        FROM BoardingPoint bp 
	        WHERE bp.busSchedule.id = :schedule_id
	          
	    """)

	List<String> getBoardingPoints(@Param("schedule_id") Long schedule_id);

}
