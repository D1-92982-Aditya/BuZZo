package com.backend.service;

import com.backend.repository.BusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BusCountServiceImpl implements BusCountService {

    private final BusRepository busRepository;

    @Override
    public long getTotalBusCount() {
        return busRepository.count();
    }
}
