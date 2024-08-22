/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products(
    id VARCHAR PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    description VARCHAR NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    image VARCHAR,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW()
 ) 