package com.jair.calendar.models.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organizers_events")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganizersEvents {

    @Id
    @ManyToOne
    @JoinColumn(name = "organizer_id")
    Organizers organizer;

    @Id
    @ManyToOne
    @JoinColumn(name = "event_id")
    Event event;
}
