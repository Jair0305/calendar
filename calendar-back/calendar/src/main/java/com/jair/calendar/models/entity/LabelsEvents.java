package com.jair.calendar.models.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "labels_events")
public class LabelsEvents {

    @Id
    @ManyToOne
    @JoinColumn(name = "label_id")
    Label label;

    @Id
    @ManyToOne
    @JoinColumn(name = "event_id")
    Event event;
}
