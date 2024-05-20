package com.jair.calendar.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {

    private Long id;
    private String placeId;
    private String name;
    private String formattedAddress;
    private Double latitude;
    private Double longitude;

}