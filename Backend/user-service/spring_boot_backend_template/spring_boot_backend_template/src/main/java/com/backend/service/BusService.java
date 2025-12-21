package com.backend.service;

import java.util.List;
import com.backend.entity.Bus;

public interface BusService {

    List<Bus> findBusescitytocity(String from, String to);

	List<Bus> Allbus();
}
