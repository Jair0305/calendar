package com.jair.calendar.controllers;

import com.jair.calendar.models.entity.Event;
import com.jair.calendar.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event)
    {
        try
        {
            eventService.save(event);
            return ResponseEntity.ok().body(event);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating event");
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
        return ResponseEntity.ok().body(eventService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id)
    {
        return ResponseEntity.ok().body(eventService.findById(id));
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
