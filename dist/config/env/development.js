"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const development = Object.assign(Object.assign({}, process.env), { DATABASE_URL: process.env.DATABASE_URL, PORT: process.env.PORT, JWT_SECRET_KEY: process.env.JWT_SECRET_KEY, EMAIL_SERVICE: process.env.EMAIL_SERVICE, EMAIL_USER: process.env.EMAIL_USER, EMAIL_PASS: process.env.EMAIL_PASS, TEST_DATABASE_URL: process.env.TEST_DATABASE_URL });
exports.default = development;
