-- Creating the database
CREATE DATABASE noteHive;

-- Creating users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  createdOn DATE DEFAULT CURRENT_DATE -- Default value added
);

-- Creating notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Added cascading delete
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(20)[], -- Array of strings for tags
    isPinned BOOLEAN NOT NULL DEFAULT FALSE, -- Ensured a default value
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Default value retained
);


-- Altering the isPinned table
ALTER TABLE notes ALTER COLUMN isPinned SET DEFAULT FALSE;
