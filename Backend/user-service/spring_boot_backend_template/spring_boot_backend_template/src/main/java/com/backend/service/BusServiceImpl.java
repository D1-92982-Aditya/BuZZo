package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.entity.Bus;
import com.backend.repository.BusRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BusServiceImpl implements BusService {

    @Autowired
    private BusRepository busRepository;

    @Override
    public List<Bus> findBusescitytocity(String from, String to) {
        return busRepository.findByFromCityAndToCity(from, to);
    }
}
