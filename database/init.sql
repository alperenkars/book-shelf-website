CREATE DATABASE IF NOT EXISTS kutuphane;

USE kutuphane;

CREATE TABLE IF NOT EXISTS books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year YEAR NOT NULL,
    isbn VARCHAR(20),
    publisher VARCHAR(255),
    pages INT
);
