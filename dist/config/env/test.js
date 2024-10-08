"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const test = Object.assign(Object.assign({}, process.env), { TEST_DATABASE_URL: process.env.TEST_DATABASE_URL, PORT: process.env.PORT });
exports.default = test;
