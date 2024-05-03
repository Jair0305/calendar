CREATE TABLE `organizers_events` (
    `organizer_id` bigint,
    `event_id` bigint,
    CONSTRAINT `fk_organizers_events_organizer_id`
        FOREIGN KEY (`organizer_id`)
            REFERENCES `organizers` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_organizers_events_event_id`
        FOREIGN KEY (`event_id`)
            REFERENCES `event` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    PRIMARY KEY (`organizer_id`, `event_id`)
);