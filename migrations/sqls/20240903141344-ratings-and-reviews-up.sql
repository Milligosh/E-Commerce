/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS ratings(
    id VARCHAR PRIMARY KEY,
    product_id VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    FOREIGN KEY(product_id)REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)