import pool from "../../config/database/db";

import { UserQueries } from "../queries/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import config from "../../config/env/development";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { responseProvider, provideResponse } from "../../helper/helper";
import { Request, Response, NextFunction, request } from "express";
import { userValidation } from "../types/types";
import { sendOtpEmail } from "../utils/email";

export class Userservice {
  static async createUser(body: any): Promise<any> {
    const { fullName, userName, email, password } = body;
    const emailExist = (
      await pool.query(UserQueries.checkEmailUniqueness, [email])
    ).rows[0];
    if (emailExist) {
      return {
        status: "Error",
        message: "Email already exist",
        code: 400,
        data: null,
      };
    }
    const userNameExist = (
      await pool.query(UserQueries.checkUsernameUniqueness, [userName])
    ).rows[0];

    if (userNameExist) {
      return {
        status: "Error",
        message: "Username already exist",
        code: 400,
        data: null,
      };
    }

    const saltRounds = 12;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashOTP = bcrypt.hashSync(otp, saltRounds);

    try {
      // Send OTP to user's email
      await sendOtpEmail(email, otp);
    } catch (error) {
      console.error("Error sending OTP:", error);
      return {
        status: "error",
        code: 500,
        message: "Failed to send OTP",
        data: null,
      };
    }

    const result = (
      await pool.query(UserQueries.createUser, [
        fullName,
        userName,
        email,
        hashPassword,
        "user",
        hashOTP,
        false,
      ])
    ).rows[0];
    return {
      status: "Success",
      message: "User created successfully",
      code: 400,
      data: result,
    };
  }

  static async verifyOTP(email: string, otp: string): Promise<any> {
    const result = (await pool.query(UserQueries.verifyOTP, [email]))
      .rows[0];
    if (!result) {
      return {
        status: "Error",
        message: " OTP not found",
        code: 400,
        data: null,
      };
    } 
    const validOTP= bcrypt.compareSync(otp,result.otp)

    if (!validOTP) {
        return {
          status: 'Error',
          message: 'Invalid OTP',
          code: 400,
          data: null
        };
      }
      const updateverify=(await pool.query(UserQueries.updateEmailVerified, [email]))
      .rows[0];
    return {
      status: "Success",
      message: "0TP verified successfully",
      code: 200,
      data:null
    };
  }
}
