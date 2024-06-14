"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueries = void 0;
exports.UserQueries = {
    createUser: `INSERT INTO users(
        fullName,
        userName,
        email,
        password,
        role,
        otp,
        emailVerified
    )VALUES($1,$2,$3,$4,$5,$6,$7) Returning id,fullName,userName,email,role,createdAt`,
    checkEmailUniqueness: ` SELECT * FROM users where email=$1`,
    checkUsernameUniqueness: ` SELECT * from users where userName=$1`,
    verifyOTP: `SELECT otp from users where email=$1`,
    updateEmailVerified: `UPDATE users SET emailVerified = true  WHERE email=$1  RETURNING *`
};
