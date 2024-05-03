package com.jair.calendar.repositories;

import com.jair.calendar.models.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findById(Long id);
    Event save(Event event);
    void deleteById(Long id);
    List<Event> findAll();
    List<Event> findByTitle(String title);
}
