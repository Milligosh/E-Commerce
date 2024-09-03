export const ProductQueries={
    createProduct: `
    INSERT INTO products (id, name, category_id, description, price, stock, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    getCategory: `
    SELECT * FROM categories where id = $1
    `,
}