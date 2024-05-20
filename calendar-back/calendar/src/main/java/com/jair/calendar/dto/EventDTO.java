package com.jair.calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {

    private Long id;
    private String coverPhoto;
    private LocalDateTime date;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String body;
    private String urlMeeting;
    private String urlEvent;
    private boolean isOnline;
    private String endDate;
    private LocationDTO location;

    // Getters and setters
}