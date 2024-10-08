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
import { StatusCodes } from "../../../helper/statusCodes";

export interface Rating {
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
}
//User Interface
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

//User service class
export class Userservice {
  //Create User
  static async createUser(body: any): Promise<any> {
    const { fullname, username, email, password } = body;
    console.log("Creating user with email:", email);
    const emailExist: User = (
      await pool.query(UserQueries.checkEmailUniqueness, [email])
    ).rows[0];
    if (emailExist) {
      console.log("Email already exists:", email);
      return {
        message: ApiConstants.EMAIL_ALREADY_EXISTS,
        code: StatusCodes.CONFLICT,
        data: null,
      };
    }
    const userNameExist: User = (
      await pool.query(UserQueries.checkUsernameUniqueness, [username])
    ).rows[0];

    if (userNameExist) {
      return {
        message: ApiConstants.USERNAME_ALREADY_EXISTS,
        code: StatusCodes.CONFLICT,
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

    //send email to user
    try {
      await sendOtpEmail(email, fullname, otp);
    } catch (error) {
      console.error("Error sending OTP:", error);
      return {
        code: StatusCodes.BAD_REQUEST,
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
    console.log("User created successfully:", result);
    return {
      message: ApiConstants.USER_CREATED_SUCCESSFULLY,
      code: StatusCodes.CREATED,
      data: result,
    };
  }

//Verify OTP
  static async verifyOTP(email: string, otp: string): Promise<any> {
    const result = (await pool.query(UserQueries.verifyOTP, [email])).rows[0];
    if (!result) {
      return {
        message: ApiConstants.USER_NOT_FOUND,
        code: StatusCodes.NOT_FOUND,
        data: null,
      };
    }

    // const isExpired = new Date() > new Date(result.otpExpiration);

    // if (isExpired) {
    //   return {
    //     message: ApiConstants.OTP_EXPIRED,
    //     code: StatusCodes.GONE,
    //     data: null,
    //   };
    // }

    const validOTP = await bcrypt.compare(otp, result.otp);

    if (!validOTP) {
      return {
        message: ApiConstants.INVALID_OTP,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const updateVerify = (
      await pool.query(UserQueries.updateEmailVerified, [email])
    ).rows[0];
    return {
      message: ApiConstants.OTP_VERIFIED_SUCCESSFULLY,
      code: StatusCodes.OK,
      data: updateVerify,
    };
  }

  //User Login
  static async logIn(body: any): Promise<any> {
    const { email, password } = body;

    try {
      const checkUserExistence = (
        await pool.query(UserQueries.checkEmailUniqueness, [email])
      ).rows[0];
      if (!checkUserExistence) {
        return {
          message: ApiConstants.USER_DOES_NOT_EXIST,
          code: StatusCodes.NOT_FOUND,
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
          code: StatusCodes.UNAUTHORIZED,
          data: null,
        };
      }
        //compare passwords
      const comparePassword = bcrypt.compareSync(password, dbpassword);
      if (!comparePassword) {
        return {
          message: ApiConstants.WRONG_CREDENTIALS,
          code: StatusCodes.UNAUTHORIZED,
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
       // options
      );

      return {
        message: ApiConstants.USER_LOGGED_IN_SUCCESSFULLY,
        code: StatusCodes.OK,
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
        
        message: "An error occurred during login",
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  static async createRatings(ratings: Rating): Promise<any> {
    try {
      const { product_id, user_id, rating, comment } = ratings;
      const id = GenericHelper.generateId();
      
      if (rating<1 || rating>5) {
        return {
          message: ApiConstants.RATINGS_MUST_BE_BETWEEN_1_AND_5,
          code: StatusCodes.NOT_ACCEPTABLE,
          data: null,
        };
      }
      const createRating = (
        await pool.query(UserQueries.createRating, [
          id,
          product_id,
          user_id,
          rating,
          comment,
        ])
      ).rows[0];
      return {
        message: ApiConstants.RATINGS_CREATED_SUCCESSFULLY,
        code: StatusCodes.CREATED,
        data: createRating,
      };
    } catch (error) {
      return {
        message: ApiConstants.ERROR_OCCURED_DURING_RATING,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  static async fetchProducts(
    searchTerm?: string,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number
  ): Promise<any> {
    try {
      let query = 'SELECT * FROM products WHERE 1=1';
      const queryParams: any[] = [];
  
      if (searchTerm) {
        query += ' AND (name ILIKE $1 OR description ILIKE $1)';
        queryParams.push(`%${searchTerm}%`);
      }
  
      if (categoryId) {
        query += ` AND category_id = $${queryParams.length + 1}`;
        queryParams.push(categoryId);
      }
  
      if (minPrice !== undefined) {
        query += ` AND price >= $${queryParams.length + 1}`;
        queryParams.push(minPrice);
      }
  
      if (maxPrice !== undefined) {
        query += ` AND price <= $${queryParams.length + 1}`;
        queryParams.push(maxPrice);
      }
  
      if (minRating !== undefined) {
        query += ` AND rating >= $${queryParams.length + 1}`;
        queryParams.push(minRating);
      }
  
      const products = (await pool.query(query, queryParams)).rows;
  
      return {
        message: ApiConstants.PRODUCTS_FETCHED_SUCCESSFULLY,
        code: StatusCodes.OK,
        data: products,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        message: ApiConstants.ERROR_FETCHING_PRODUCTS,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }
}

