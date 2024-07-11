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
exports.resetPassword = exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const development_1 = __importDefault(require("../../config/env/development"));
const otp_template_1 = require("../../email/otp.template");
const transporter = nodemailer_1.default.createTransport({
    service: development_1.default.EMAIL_SERVICE,
    auth: {
        user: development_1.default.EMAIL_USER,
        pass: development_1.default.EMAIL_PASS,
    },
});
function sendOtpEmail(to, fullName, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: development_1.default.EMAIL_USER,
            to: to,
            subject: `MilliJoule's App`,
            html: (0, otp_template_1.sendOtp)(fullName, otp)
        };
        yield transporter.sendMail(mailOptions);
    });
}
exports.sendOtpEmail = sendOtpEmail;
const transport = nodemailer_1.default.createTransport({
    service: development_1.default.EMAIL_SERVICE,
    auth: {
        user: development_1.default.EMAIL_USER,
        pass: development_1.default.EMAIL_PASS
    }
});
function resetPassword(to, resetToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: development_1.default.EMAIL_USER,
            to: to,
            subject: `MilliJoule's App`,
            html: (0, otp_template_1.sendOtp)(to, resetToken)
        };
        yield transport.sendMail(mailOptions);
    });
}
exports.resetPassword = resetPassword;
