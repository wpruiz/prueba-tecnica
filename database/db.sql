-- CREATE DATABASE postdb IF NOT EXISTS;
-- use postdb;

CREATE TABLE post(
  id INT PRIMARY KEY,
  title VARCHAR(200),
  body VARCHAR(1000),
  userId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- describe post;