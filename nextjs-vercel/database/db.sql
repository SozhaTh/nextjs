-- Active: 1732066210856@@127.0.0.1@3306@prueba
CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2),
    tallas VARCHAR(200),
    color VARCHAR(200),
    material VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE product ADD COLUMN image VARCHAR(200) ;