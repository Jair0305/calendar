package com.jair.calendar.models.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String placeId;
    String name;
    String formattedAddress;
    Double latitude;
    Double longitude;

    @Override
    public boolean equals(Object obj)
    {
        if(this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Location location = (Location) obj;

        return Objects.equals(id, location.id) &&
                Objects.equals(placeId, location.placeId) &&
                Objects.equals(name, location.name) &&
                Objects.equals(formattedAddress, location.formattedAddress) &&
                Objects.equals(latitude, location.latitude) &&
                Objects.equals(longitude, location.longitude);
    }


}
