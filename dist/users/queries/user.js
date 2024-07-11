"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueries = void 0;
exports.UserQueries = {
    createUser: `INSERT INTO users(
        fullname,
        username,
        email,
        password,
        role,
        otp,
        emailVerified,
        otpExpiration
    )VALUES($1,$2,$3,$4,$5,$6,$7,$8) Returning id,fullname,username,email,role,createdat`,
    checkEmailUniqueness: ` SELECT * FROM users where email=$1`,
    checkUsernameUniqueness: ` SELECT * from users where username=$1`,
    verifyOTP: `SELECT otp,otpExpiration from users where email=$1`,
    updateEmailVerified: `UPDATE users SET emailVerified = true  WHERE email=$1  
    RETURNING id,fullname,username,email,role,otpExpiration,emailVerified,createdat,updatedat`,
    checkEmailVerified: `SELECT emailVerified FROM users WHERE email =$1 `,
};
