CREATE TABLE `event` (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `cover_photo` varchar(255),
    `date` datetime NOT NULL,
    `title` varchar(50) NOT NULL,
    `description` varchar(200) NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `location_id` bigint,
    `body` text,
    CONSTRAINT `fk_event_location_id`
        FOREIGN KEY (`location_id`)
            REFERENCES `locations` (`id`)
            ON DELETE SET NULL
            ON UPDATE CASCADE
);