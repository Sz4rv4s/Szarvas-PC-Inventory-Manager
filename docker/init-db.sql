CREATE DATABASE IF NOT EXISTS szarvaspc;

USE szarvaspc;

CREATE TABLE IF NOT EXISTS warehouses (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(30) NOT NULL,
    address VARCHAR(60) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS parts (
    id INT PRIMARY KEY NOT NULL,
    model VARCHAR(60) NOT NULL,
    brand VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    warehouse_id INT NOT NULL,
    CONSTRAINT parts_fk FOREIGN KEY (warehouse_id) REFERENCES warehouses (id)
);

INSERT INTO warehouses VALUES (1, 'Large Warehouse', 'Debrecen', 'Petőfi st. 15/b', 10000);
INSERT INTO warehouses VALUES (2, 'West Warehouse', 'Szeged', 'Szabadság st 97', 6750);
INSERT INTO warehouses VALUES (3, 'South Warehouse', 'Nyíregyháza', 'Hunyadi st 75/a', 8210);

INSERT INTO parts VALUES (1, 'RTX 3060 8G', 'MSI', 200000, 1);
INSERT INTO parts VALUES (2, 'Core I3-9100F', 'Intel', 30000, 3);
INSERT INTO parts VALUES (3, 'RX 570 8G', 'MSI', 50000, 2);
INSERT INTO parts VALUES (4, 'H-310M', 'ASUS', 30694, 2);
INSERT INTO parts VALUES (5, 'ECO SERIES 600W', 'Chieftec', 25000, 1);
INSERT INTO parts VALUES (6, 'RTX 4080 Ti', 'ASUS', 400000, 1);
INSERT INTO parts VALUES (7, 'NF-A14x25', 'Noctua', 21000, 3);
 
CREATE USER IF NOT EXISTS 'api'@'%' IDENTIFIED BY 'api';
GRANT ALL PRIVILEGES ON szarvaspc.* TO 'api'@'%';

FLUSH PRIVILEGES;