
CREATE TYPE roleType AS ENUM ('user', 'admin','superAdmin');
CREATE TABLE IF NOT EXISTS users(
    id VARCHAR PRIMARY KEY,
    fullName VARCHAR (255) NOT NULL,
    userName VARCHAR(255)unique NOT NULL,
    email VARCHAR unique,
    password VARCHAR (255) NOT NULL,
    role roleType,
    otp VARCHAR(255),
    otpExpiration TIMESTAMPTZ,
    resetToken VARCHAR(255),
    resetTokenExpiration TIMESTAMPTZ,
    emailVerified BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW()
)