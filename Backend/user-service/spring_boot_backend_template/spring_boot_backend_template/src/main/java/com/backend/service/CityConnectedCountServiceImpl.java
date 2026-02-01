package com.backend.service;

import org.springframework.stereotype.Service;

import com.backend.repository.CityConnectedCountRepository;
import com.backend.service.CityConnectedCountService;

@Service
public class CityConnectedCountServiceImpl implements CityConnectedCountService {

    private final CityConnectedCountRepository cityConnectedCountRepository;

    public CityConnectedCountServiceImpl(
            CityConnectedCountRepository cityConnectedCountRepository) {
        this.cityConnectedCountRepository = cityConnectedCountRepository;
    }

    @Override
    public Long getCityConnectedCount() {
        return cityConnectedCountRepository.countDistinctConnectedCities();
    }
}
