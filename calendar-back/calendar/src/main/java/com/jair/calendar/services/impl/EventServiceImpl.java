package com.jair.calendar.services.impl;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.models.entity.Location;
import com.jair.calendar.repositories.EventRepository;
import com.jair.calendar.repositories.LocationRepository;
import com.jair.calendar.services.EventService;
import com.jair.calendar.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Override
    public List<Event> findByDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime startOfNextDay = date.plusDays(1).atStartOfDay();
        return eventRepository.findByDateBetween(startOfDay, startOfNextDay);
    }


    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private S3Service s3Service;

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
    public Event save(Event event, MultipartFile file) throws IOException {

        String filename = file.getOriginalFilename();
        s3Service.uploadFile(file);
        String url = s3Service.getFileUrl(filename);

        if(event.getOnline() && ((event.getUrlEvent() == null) || event.getUrlEvent().isEmpty())) {
            throw new IllegalArgumentException("Online events must have a URL");
        }

        if(!event.getOnline() && event.getLocation() == null)
        {
            throw new IllegalArgumentException("In person events must have a location");
        }

        Location location = event.getLocation();
        if(location != null) {
            Location existingLocation = locationRepository.findByName(location.getName());
            if (existingLocation != null && existingLocation.equals(location)) {
                event.setLocation(existingLocation);
            } else {
                Location newLocation = locationRepository.save(location);
                event.setLocation(newLocation);
            }
        }

        event.setCoverPhoto(url);
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
