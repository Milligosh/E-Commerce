"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userservice = void 0;
const db_1 = __importDefault(require("../../config/database/db"));
const user_1 = require("../queries/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
class Userservice {
    static createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, userName, email, password } = body;
            const emailExist = (yield db_1.default.query(user_1.UserQueries.checkEmailUniqueness, [email])).rows[0];
            if (emailExist) {
                return {
                    status: "Error",
                    message: "Email already exist",
                    code: 400,
                    data: null,
                };
            }
            const userNameExist = (yield db_1.default.query(user_1.UserQueries.checkUsernameUniqueness, [userName])).rows[0];
            if (userNameExist) {
                return {
                    status: "Error",
                    message: "Username already exist",
                    code: 400,
                    data: null,
                };
            }
            const saltRounds = 12;
            const hashPassword = bcrypt_1.default.hashSync(password, saltRounds);
            const otp = crypto_1.default.randomInt(100000, 999999).toString();
            const hashOTP = bcrypt_1.default.hashSync(otp, saltRounds);
            try {
                // Send OTP to user's email
                yield (0, email_1.sendOtpEmail)(email, otp);
            }
            catch (error) {
                console.error("Error sending OTP:", error);
                return {
                    status: "error",
                    code: 500,
                    message: "Failed to send OTP",
                    data: null,
                };
            }
            const result = (yield db_1.default.query(user_1.UserQueries.createUser, [
                fullName,
                userName,
                email,
                hashPassword,
                "user",
                hashOTP,
                false,
            ])).rows[0];
            return {
                status: "Success",
                message: "User created successfully",
                code: 400,
                data: result,
            };
        });
    }
    static verifyOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield db_1.default.query(user_1.UserQueries.verifyOTP, [email]))
                .rows[0];
            if (!result) {
                return {
                    status: "Error",
                    message: " OTP not found",
                    code: 400,
                    data: null,
                };
            }
            const validOTP = bcrypt_1.default.compareSync(otp, result.otp);
            if (!validOTP) {
                return {
                    status: 'Error',
                    message: 'Invalid OTP',
                    code: 400,
                    data: null
                };
            }
            const updateverify = (yield db_1.default.query(user_1.UserQueries.updateEmailVerified, [email]))
                .rows[0];
            return {
                status: "Success",
                message: "0TP verified successfully",
                code: 200,
                data: null
            };
        });
    }
}
exports.Userservice = Userservice;
