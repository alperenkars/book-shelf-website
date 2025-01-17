CREATE DATABASE IF NOT EXISTS kutuphane;

USE kutuphane;

CREATE TABLE IF NOT EXISTS Book (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year YEAR NOT NULL,
    isbn VARCHAR(20),
    publisher VARCHAR(255),
    pages INT
);

CREATE TABLE IF NOT EXISTS User (
    user_id CHAR(8) NOT NULL, 
    user_name CHAR(30), 
    email CHAR(40), 
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS Library (
    library_id CHAR(8) NOT NULL, 
    lib_name CHAR(30), 
    description CHAR(50), 
    create_date CHAR(12),  
    built_by CHAR(8),
    PRIMARY KEY (library_id),
    FOREIGN KEY (built_by) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS BookCopy (
    copy_id CHAR(8) NOT NULL, 
    book_id INT NOT NULL,
    owned_by CHAR(8),
    PRIMARY KEY (copy_id, book_id),
    FOREIGN KEY (book_id) REFERENCES Book(book_id),
    FOREIGN KEY (owned_by) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS Library_Includes_Book (
    library_id CHAR(8) NOT NULL,
    book_id INT NOT NULL,
    PRIMARY KEY (library_id, book_id),
    FOREIGN KEY (library_id) REFERENCES Library(library_id),
    FOREIGN KEY (book_id) REFERENCES Book(book_id)
);

CREATE TABLE IF NOT EXISTS Follow (
    follower_id CHAR(8) NOT NULL,
    following_id CHAR(8) NOT NULL, 
    follow_date CHAR(12), 
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES User(user_id),
    FOREIGN KEY (following_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS User_Borrow_Book (
    copy_id CHAR(8) NOT NULL,
    user_id CHAR(8) NOT NULL,
    status CHAR(30), 
    borrow_date CHAR(12), 
    return_date CHAR(12), 
    PRIMARY KEY (copy_id, user_id),
    FOREIGN KEY (copy_id) REFERENCES BookCopy(copy_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
