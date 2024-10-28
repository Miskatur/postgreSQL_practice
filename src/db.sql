CREATE DATABASE bookDB


CREATE TABLE book (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(255)
);

INSERT INTO book (id,name,description) 
VALUES 
(101, Mayaboti,Mayaboti is a book written by Legendary writer Humayun Ahmed);


DROP TABLE book;


SELECT * FROM book;

SELECT * FROM book WHERE id = 123;

DELETE FROM book WHERE id = 123;