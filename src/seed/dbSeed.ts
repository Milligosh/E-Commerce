import {  configDotenv } from "dotenv";
configDotenv()
import bcrypt from 'bcrypt'
import pool from "../config/database/db";



const { ADMIN_FULLNAME:fullName,
    ADMIN_USERNAME:username,
    ADMIN_EMAIL:email,
    ADMIN_PASSWORD:password }=process.env


    const createAdmin= `INSERT INTO users(
        fullname,
        username,
        email,
        password,
        role,
        emailVerified
        
    )VALUES($1,$2,$3,$4,$5,$6) Returning id,fullname,username,email,role,createdat`

    const saltRounds:number=12
   const hashPassword= bcrypt.hashSync(password as string,saltRounds)

   const func=():void=>{
    console.log("ready to seed in super admin...");
    const response = pool.query(createAdmin,[
        fullName,
        username,
        email,
        hashPassword,
        "admin",
        true
       ])
    .then(() => {
    console.log("seeding completed with no issues.🎉...");
    process.exit(0);
  })
  .catch((e:Error) => {
    console.log("Error", e.message);
    process.exit(1);
  });
};
func();