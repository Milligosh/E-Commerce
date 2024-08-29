/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS categories(
    id VARCHAR PRIMARY KEY,
    name VARCHAR(255)UNIQUE NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW()
)