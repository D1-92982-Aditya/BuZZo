package com.backend.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DroppingPointRequestDTO {
	
	private String locationName;
    private LocalTime droppingTime;
	

}
