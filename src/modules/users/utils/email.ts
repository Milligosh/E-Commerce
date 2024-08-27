import nodemailer from "nodemailer";
import config from "../../../config/env/development";
import { sendOtp } from "../../../email/otp.template";


const transporter = nodemailer.createTransport({
  service: config.EMAIL_SERVICE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export async function sendOtpEmail(
  to: string,
  fullName: string,
  otp: string
): Promise<void> {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: to,
    subject: `MilliJoule's App`,
    html: sendOtp(fullName, otp),
  };

  await transporter.sendMail(mailOptions);
}

const transport = nodemailer.createTransport({
  service: config.EMAIL_SERVICE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});
export async function resetPassword(
  to: string,
  resetToken: string
): Promise<void> {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: to,
    subject: `MilliJoule's App`,
    html: sendOtp(to, resetToken),
  };
  await transport.sendMail(mailOptions);
}

