package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.entity.DroppingPoint;

public interface DroppingPointRepository extends JpaRepository<DroppingPoint, Long> {

	
	@Query
	("""
	        SELECT dp.locationName
	        FROM DroppingPoint dp 
	        WHERE dp.busSchedule.id = :schedule_id
	          
	    """)
	List<String> getDroppingPoints(Long schedule_id);

}
