import pool from "../../../config/database/db";

import { UserQueries } from "../queries/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import config from "../../../config/env/development";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
//import { responseProvider, provideResponse } from "../../../helper/helper";
import { Request, Response, NextFunction, request } from "express";
import { userValidation } from "../types/types";
import { sendOtpEmail } from "../utils/email";
import { sendOtp } from "../../../email/otp.template";
import { GenericHelper } from "../../../helper/generator";
import { ApiConstants } from "../../../helper/constants";
import api from "../../../config/versioning/v1";

export default interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdat: string;
  emailVerified: boolean;
}
export class Userservice {
  static async createUser(body: any): Promise<any> {
    const { fullname, username, email, password } = body;
    const emailExist: User = (
      await pool.query(UserQueries.checkEmailUniqueness, [email])
    ).rows[0];
    if (emailExist) {
      return {
        message: ApiConstants.EMAIL_ALREADY_EXISTS,
        code: 400,
        data: null,
      };
    }
    const userNameExist: User = (
      await pool.query(UserQueries.checkUsernameUniqueness, [username])
    ).rows[0];

    if (userNameExist) {
      return {
        message: ApiConstants.USERNAME_ALREADY_EXISTS,
        code: 400,
        data: null,
      };
    }
    const id = GenericHelper.generateId();
    const newRequest = { id, ...body };
    const saltRounds = 12;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashOTP = bcrypt.hashSync(otp, saltRounds);
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    try {
      // Send OTP to user's email
      await sendOtpEmail(email, fullname, otp);
    } catch (error) {
      console.error("Error sending OTP:", error);
      return {
        code: 500,
        message: ApiConstants.FAILED_TO_SEND_OTP,
        data: null,
      };
    }

    const result: User = (
      await pool.query(UserQueries.createUser, [
        id,
        fullname,
        username,
        email,
        hashPassword,
        "user",
        hashOTP,
        false,
        otpExpiration,
      ])
    ).rows[0];
    return {
      message: ApiConstants.USER_CREATED_SUCCESSFULLY,
      code: 200,
      data: result,
    };
  }

  static async verifyOTP(email: string, otp: string): Promise<any> {
    const result = (await pool.query(UserQueries.verifyOTP, [email])).rows[0];
    if (!result) {
      return {
        message: ApiConstants.OTP_NOT_FOUND,
        code: 400,
        data: null,
      };
    }

    const isExpired = new Date() > new Date(result.otpExpiration);

    if (isExpired) {
      return {
        message: ApiConstants.OTP_EXPIRED,
        code: 400,
        data: null,
      };
    }

    const validOTP = bcrypt.compareSync(otp, result.otp);

    if (!validOTP) {
      return {
        message: ApiConstants.INVALID_OTP,
        code: 400,
        data: null,
      };
    }
    const updateVerify = (
      await pool.query(UserQueries.updateEmailVerified, [email])
    ).rows[0];
    console.log("Email verification update result:", updateVerify);
    return {
      message: ApiConstants.OTP_VERIFIED_SUCCESSFULLY,
      code: 200,
      data: updateVerify,
    };
  }

  static async logIn(body: any): Promise<any> {
    const { email, password } = body;

    try {
      const checkUserExistence = (
        await pool.query(UserQueries.checkEmailUniqueness, [email])
      ).rows[0];
      if (!checkUserExistence) {
        return {
          message: ApiConstants.USER_DOES_NOT_EXIST,
          code: 400,
          data: null,
        };
      }

      const {
        emailverified,
        fullname,
        password: dbpassword,
        id,
        role,
        username,
        createdat,
      } = checkUserExistence;
      if (!emailverified) {
        return {
          message: ApiConstants.EMAIL_NOT_VERIFIED,
          code: 400,
          data: null,
        };
      }

      const comparePassword = bcrypt.compareSync(password, dbpassword);
      if (!comparePassword) {
        return {
          message: ApiConstants.WRONG_CREDENTIALS,
          code: 400,
          data: null,
        };
      }

      // Generate JWT token
      const options: jwt.SignOptions = {
        expiresIn: "1d",
      };

      const token: string = jwt.sign(
        {
          id,
          fullname,
          username,
          email,
          role,
          createdat,
        },
        config.JWT_SECRET_KEY as string,
        options
      );

      return {
        message: ApiConstants.USER_LOGGED_IN_SUCCESSFULLY,
        code: 200,
        data: {
          id,
          fullname,
          username,
          email,
          role,
          token,
          createdat,
        },
      };
    } catch (error) {
      return {
        status: "Error",
        message: "An error occurred during login",
        code: 500,
        data: null,
      };
    }
  }
}
