CREATE DATABASE IF NOT EXISTS szarvaspc;

USE szarvaspc;

CREATE TABLE IF NOT EXISTS warehouses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS parts (
    id INT PRIMARY KEY NOT NULL,
    model VARCHAR(60) NOT NULL,
    brand VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    warehouse_id INT NOT NULL,
    CONSTRAINT parts_fk FOREIGN KEY (warehouse_id) REFERENCES warehouses (id)
) ENGINE=InnoDB;

INSERT INTO warehouses (id, name, city, address, capacity) VALUES (1, 'Large Warehouse', 'Berlin', 'Alexanderplatz 15', 10000);
INSERT INTO warehouses (id, name, city, address, capacity) VALUES (2, 'West Warehouse', 'Munich', 'Marienplatz 97', 6750);
INSERT INTO warehouses (id, name, city, address, capacity) VALUES (3, 'South Warehouse', 'Zurich', 'Bahnhofstrasse 75', 8210);
INSERT INTO warehouses (id, name, city, address, capacity) VALUES (4, 'Central Warehouse', 'Paris', 'Rue de Rivoli 12', 15000);
INSERT INTO warehouses (id, name, city, address, capacity) VALUES (5, 'North Warehouse', 'Amsterdam', 'Dam Square 21', 7000);
INSERT INTO warehouses (id, name, city, address, capacity) VALUES (6, 'East Warehouse', 'Vienna', 'Stephansplatz 8', 9000);

INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (1, 'RTX 3060 8G', 'MSI', 526, 1);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (2, 'Core I3-9100F', 'Intel', 79, 6);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (3, 'RX 570 8G', 'MSI', 132, 2);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (4, 'H-310M', 'ASUS', 81, 4);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (5, 'ECO SERIES 600W', 'Chieftec', 66, 1);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (6, 'RTX 4080 Ti', 'ASUS', 1053, 5);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (7, 'NF-A14x25', 'Noctua', 55, 3);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (9, 'RTX 3070 8G', 'Gigabyte', 632, 1);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (10, 'Core i5-10400F', 'Intel', 132, 5);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (11, 'B450 TOMAHAWK MAX', 'MSI', 84, 4);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (12, 'Vengeance LPX 16GB', 'Corsair', 66, 6);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (13, 'ROG STRIX B550-F', 'ASUS', 145, 2);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (14, 'RM850x 850W PSU', 'Corsair', 118, 3);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (15, 'RX 6800 XT 16G', 'Sapphire', 947, 4);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (16, 'Ryzen 5 5600X', 'AMD', 189, 6);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (17, 'Kraken X63', 'NZXT', 118, 1);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (18, 'NH-D15', 'Noctua', 105, 5);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (19, 'RTX 4090 24G', 'EVGA', 1711, 3);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (20, 'Core i7-11700K', 'Intel', 263, 2);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (21, 'TUF Gaming X570-Plus', 'ASUS', 126, 4);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (22, 'Barracuda 2TB HDD', 'Seagate', 47, 5);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (23, 'MP600 1TB NVMe SSD', 'Corsair', 95, 6);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (24, 'Viper Steel 32GB', 'Patriot', 137, 1);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (25, 'Ryzen 9 5950X', 'AMD', 579, 6);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (26, 'Dark Rock Pro 4', 'be quiet!', 100, 3);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (27, 'AX1600i 1600W PSU', 'Corsair', 184, 4);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (28, 'RTX 3050 4G', 'ASUS', 395, 2);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (29, 'Core i9-11900KF', 'Intel', 447, 5);
INSERT INTO parts (id, model, brand, price, warehouse_id) VALUES (30, 'Pure Base 500DX', 'be quiet!', 89, 4);

CREATE USER IF NOT EXISTS 'api'@'%' IDENTIFIED BY 'api';
GRANT ALL PRIVILEGES ON szarvaspc.* TO 'api'@'%';

FLUSH PRIVILEGES;