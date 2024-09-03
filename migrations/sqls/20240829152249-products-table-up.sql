
CREATE TABLE IF NOT EXISTS products(
    id VARCHAR PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    category_id VARCHAR not null,
    description VARCHAR NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    image VARCHAR,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW()
 ) 