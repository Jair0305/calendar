package com.jair.calendar.repositories;

import com.jair.calendar.models.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Location findByName(String name);


}
