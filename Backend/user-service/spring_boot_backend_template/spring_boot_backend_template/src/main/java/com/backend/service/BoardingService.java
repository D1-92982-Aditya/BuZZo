package com.backend.service;

import java.util.List;

import com.backend.dto.BoardingPointRequestDTO;

public interface BoardingService {

	List<String> getBoardingPoints(Long schedule_id);

}
