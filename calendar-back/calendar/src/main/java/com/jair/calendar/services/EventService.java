package com.jair.calendar.services;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.models.entity.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EventService {

    public List<Event> findAll();
    public Event findById(Long id);
    public Event save(Event event);
    Event save(Event event, Location location);
    public void deleteById(Long id);
    public List<Event> findByTitle(String title);
    public Event update(Event event);
}
