CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE todo_database;
--\c into todo_database
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);
SELECT * FROM users;
INSERT INTO users (user_name,user_email,user_password) VALUES('vinay','vinay@gmail.com','password');
INSERT INTO users (user_name,user_email,user_password) VALUES('fred','fred@gmail.com','password');