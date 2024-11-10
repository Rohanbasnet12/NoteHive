-- Creating the database
CREATE DATABASE noteHive

-- Creating users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  createdOn DATE
);

-- Creating notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(20)[], -- Array of strings for tags
    isPinned BOOLEAN NOT NULL, -- Boolean instead of string to represent a true/false state
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
