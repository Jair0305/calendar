CREATE TABLE `location` (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `place_id` varchar(255),
    `name` varchar(255),
    `formatted_address` varchar(255),
    `latitude` decimal(10,8),
    `longitude` decimal(11,8)
);