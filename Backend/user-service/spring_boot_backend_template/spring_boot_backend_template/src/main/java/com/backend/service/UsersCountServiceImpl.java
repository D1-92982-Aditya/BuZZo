package com.backend.service;

import com.backend.repository.UserRepository;
import com.backend.service.UsersCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersCountServiceImpl implements UsersCountService {

    private final UserRepository userRepository;

    @Override
    public long getUsersCount() {
        return userRepository.count();
    }
}

