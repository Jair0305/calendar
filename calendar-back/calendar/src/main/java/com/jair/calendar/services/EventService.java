package com.jair.calendar.services;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.models.entity.Location;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public interface EventService {

    List<Event> findAll();
    Event findById(Long id);
    Event save(Event event, MultipartFile file) throws IOException;
    //Event save(Event event, Location location);
    void deleteById(Long id);
    List<Event> findByTitle(String title);
    Event update(Event event);
    List<Event> findByDate(LocalDate date);

}
