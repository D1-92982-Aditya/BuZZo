package com.backend.controller;

import com.backend.service.UsersCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users-count")
@RequiredArgsConstructor
public class UsersCountController {

    private final UsersCountService usersCountService;

    // API to get total number of users — accessible by everyone
    @GetMapping
    public Map<String, Long> getUsersCount() {
        long count = usersCountService.getUsersCount();
        Map<String, Long> response = new HashMap<>();
        response.put("totalUsers", count);
        return response;
    }
}
