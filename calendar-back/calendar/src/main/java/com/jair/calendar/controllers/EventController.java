package com.jair.calendar.controllers;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.services.EventService;
import com.jair.calendar.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    @Autowired
    private EventService eventService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createEvent(@RequestPart("event") Event event, @RequestPart("image")MultipartFile image)
    {
        try
        {
            eventService.save(event, image);
            return ResponseEntity.ok().body(event);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating event" + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id)
    {
        try
        {
            eventService.deleteById(id);
            return ResponseEntity.ok().body("Event deleted");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting event");
        }
    }

    @GetMapping
    public ResponseEntity<?> getEvents()
    {
        try
        {
            return ResponseEntity.ok().body(eventService.findAll());
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting events");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id)
    {
        try
        {
            return ResponseEntity.ok().body(eventService.findById(id));

        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting event");
        }
    }

    @GetMapping("/date")
    public ResponseEntity<?> getEventsByDate(@RequestParam String date)
    {
        try
        {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse(date, formatter);

            return ResponseEntity.ok().body(eventService.findByDate(localDate));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting events");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event event)
    {
        try
        {
            event.setId(id);
            eventService.update(event);
            return ResponseEntity.ok().body(event);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating event");
        }
    }

}
