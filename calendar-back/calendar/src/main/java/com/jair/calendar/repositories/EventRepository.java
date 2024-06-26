package com.jair.calendar.repositories;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.models.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByTitle(String title);

    Optional<Event> findById(Long id);

    List<Event> findByLocation(Location location);

    List<Event> findByDate(LocalDateTime date);
    List<Event> findByDateBetween(LocalDateTime start, LocalDateTime end);
}
