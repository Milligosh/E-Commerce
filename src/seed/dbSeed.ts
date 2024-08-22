import { configDotenv } from "dotenv";
configDotenv();
import bcrypt from "bcrypt";
import pool from "../config/database/db";
import { GenericHelper } from "../helper/generator";

const {
  SUPER_ADMIN_FULLNAME: fullname,
  SUPER_ADMIN_USERNAME: username,
  SUPER_ADMIN_EMAIL: email,
  SUPER_ADMIN_PASSWORD: password,
} = process.env;

const createAdmin: string = `INSERT INTO users(
        id,
        fullname,
        username,
        email,
        password,
        role,
        emailVerified
        
    )VALUES($1,$2,$3,$4,$5,$6,$7) Returning id,fullname,username,email,role,createdat`;

const id = GenericHelper.generateId();

const saltRounds: number = 12;
const hashPassword = bcrypt.hashSync(password as string, saltRounds);

const func = (): void => {
  console.log("ready to seed in super admin...");
  const response = pool
    .query(createAdmin, [
      id,
      fullname,
      username,
      email,
      hashPassword,
      "superAdmin",
      true,
    ])
    .then(() => {
      console.log("seeding completed with no issues.🎉...");
      process.exit(0);
    })
    .catch((e: Error) => {
      console.log("Error", e.message);
      process.exit(1);
    });
};
func();
