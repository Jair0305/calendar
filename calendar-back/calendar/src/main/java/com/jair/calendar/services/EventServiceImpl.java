package com.jair.calendar.services;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.models.entity.Location;
import com.jair.calendar.repositories.EventRepository;
import com.jair.calendar.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event findById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    @Override
    public Event save(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event save(Event event, Location location) {
        Location existingLocation = locationRepository.findByName(location.getName());
        if (existingLocation != null && existingLocation.equals(location)) {
            event.setLocation(existingLocation);
        } else {
            Location newLocation = locationRepository.save(location);
            event.setLocation(newLocation);
        }
        return eventRepository.save(event);
    }
    @Override
    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<Event> findByTitle(String title) {
        return eventRepository.findByTitle(title);
    }

    @Override
    public Event update(Event event) {
        return eventRepository.save(event);
    }
}
