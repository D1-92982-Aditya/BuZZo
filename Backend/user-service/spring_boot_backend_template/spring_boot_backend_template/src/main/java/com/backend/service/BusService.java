package com.backend.service;

import com.backend.dto.BusRequestDTO;
import com.backend.entity.Bus;

public interface BusService {

    Bus addBus(BusRequestDTO dto);
}
