CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(40) UNIQUE NOT NULL,
    
    name VARCHAR(25) NOT NULL,
    username VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    gender ENUM('M','F','ND'),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auth (
    user_id VARCHAR(40) UNIQUE NOT NULL,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(70) UNIQUE NOT NULL,
    roll ENUM('user','admin') DEFAULT 'user' NOT NULL
);