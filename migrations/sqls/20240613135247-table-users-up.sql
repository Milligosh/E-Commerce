/* Replace with your SQL commands */
CREATE TYPE roleType AS ENUM ('user', 'admin');
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    fullName VARCHAR (255) NOT NULL,
    userName VARCHAR(255)unique NOT NULL,
    email VARCHAR unique,
    password VARCHAR (255) NOT NULL,
    role roleType,
    otp VARCHAR(255),
    emailVerified BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW()
)