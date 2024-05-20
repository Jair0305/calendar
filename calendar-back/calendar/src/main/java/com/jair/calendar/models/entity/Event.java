package com.jair.calendar.models.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "events")
@JsonDeserialize
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String coverPhoto;
    LocalDateTime date;
    String title;
    String description;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    String body;
    String urlMeeting;
    String urlEvent;
    boolean online;
    String endDate;

    @ManyToOne
    @JoinColumn(name = "location_id")
    Location location;

    public boolean getOnline() {
        return online;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if(this.updatedAt == null) {
            this.updatedAt = LocalDateTime.now();
        }
    }

}
