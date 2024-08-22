export const AdminQueries ={
    createAdmin:`INSERT INTO users(
        id,
        fullname,
        username,
        email,
        password,
        role,
        emailVerified
        
    )VALUES($1,$2,$3,$4,$5,$6,$7) Returning id,fullname,username,email,role,createdat`,
    getAdminByEmail: `SELECT id,email,password,role FROM users WHERE email=$1`,
    getAdminById: `SELECT * FROM users WHERE id=$1`,
}