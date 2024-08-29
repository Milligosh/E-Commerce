export const CategoryQueries={
    createCategory:`INSERT INTO categories(id,name)VALUES($1,$2) RETURNING *`,
    checkNameUniqueness:`SELECT * FROM categories WHERE name=$1`
}