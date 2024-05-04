CREATE TABLE `events` (
     `id` bigint PRIMARY KEY AUTO_INCREMENT,
     `cover_photo` varchar(255),
     `date` datetime,
     `title` varchar(50),
     `summary` varchar(200),
     `location_id` bigint,
     `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
     `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     `body` text,
     CONSTRAINT `fk_event_location_id`
         FOREIGN KEY (`location_id`)
             REFERENCES `location` (`id`)
             ON DELETE SET NULL
             ON UPDATE CASCADE
);