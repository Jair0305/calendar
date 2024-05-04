package com.jair.calendar.models.entity;

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
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String coverPhoto;
    LocalDateTime date;
    String title;
    String description;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    String body;

    @ManyToOne
    @JoinColumn(name = "location_id")
    Location location;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if(this.updatedAt == null) {
            this.updatedAt = LocalDateTime.now();
        }
    }

}
