package com.jair.calendar.repositories;

import com.jair.calendar.models.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
