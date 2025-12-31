package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.repository.BoardingPointRepository;
import com.backend.repository.DroppingPointRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DroppingServiceImpl implements DroppingService {

	private final DroppingPointRepository droppingPointRepository;
	@Override
	public List<String> getDroppingPoints(Long schedule_id) {
		// TODO Auto-generated method stub
		return droppingPointRepository.getDroppingPoints(schedule_id);
	}

}
