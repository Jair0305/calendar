CREATE TABLE `events` (
     `id` bigint PRIMARY KEY AUTO_INCREMENT,
     `cover_photo` varchar(255),
     `date` datetime,
     `title` varchar(50),
     `description` varchar(200),
     `location_id` bigint,
     `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
     `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     `body` text,
     `online` BOOLEAN,
     `url_Event` VARCHAR(255),
    `url_Meeting` VARCHAR(255),
    `end_date` datetime,
     CONSTRAINT `fk_event_location_id`
         FOREIGN KEY (`location_id`)
             REFERENCES `location` (`id`)
             ON DELETE SET NULL
             ON UPDATE CASCADE
);