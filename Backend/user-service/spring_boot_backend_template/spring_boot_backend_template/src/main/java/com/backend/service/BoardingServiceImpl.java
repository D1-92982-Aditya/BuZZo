package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dto.BoardingPointRequestDTO;
import com.backend.repository.BoardingPointRepository;
import com.backend.repository.BusSearchRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class BoardingServiceImpl implements BoardingService {

	private final BoardingPointRepository boardingPointRepo;
	@Override
	public List<String> getBoardingPoints(Long schedule_id) {
		// TODO Auto-generated method stub
		return boardingPointRepo.getBoardingPoints(schedule_id);
	}

}
