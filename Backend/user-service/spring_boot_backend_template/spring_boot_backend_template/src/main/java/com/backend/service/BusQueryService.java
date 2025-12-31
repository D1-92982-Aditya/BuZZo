package com.backend.service;

import java.util.List;

import com.backend.dto.AvailableBusDTO;

public interface BusQueryService {

	List<AvailableBusDTO[]> getBuses(List<Long> scheduleIds);

}
