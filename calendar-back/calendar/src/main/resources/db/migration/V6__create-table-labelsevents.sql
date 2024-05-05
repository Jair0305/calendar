CREATE TABLE `labels_events` (
    `label_id` bigint,
    `event_id` bigint,
    CONSTRAINT `fk_labels_events_label_id`
        FOREIGN KEY (`label_id`)
            REFERENCES `labels` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_labels_events_event_id`
        FOREIGN KEY (`event_id`)
            REFERENCES `events` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    PRIMARY KEY (`label_id`, `event_id`)
);