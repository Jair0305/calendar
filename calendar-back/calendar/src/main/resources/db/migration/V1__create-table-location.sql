CREATE TABLE `locations` (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `address` varchar(100) NOT NULL,
    `latitude` double NOT NULL,
    `longitude` double NOT NULL
);