package com.backend.repository;

import com.backend.entity.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CityConnectedCountRepository
        extends JpaRepository<BusSchedule, Long> {

    @Query(
        value = "SELECT COUNT(DISTINCT city) FROM (" +
                "SELECT from_city AS city FROM bus_schedules " +
                "UNION " +
                "SELECT to_city AS city FROM bus_schedules" +
                ") AS all_cities",
        nativeQuery = true
    )
    Long countDistinctConnectedCities();
}
