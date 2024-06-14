"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const development_1 = __importDefault(require("./development"));
const test_1 = __importDefault(require("./test"));
(0, dotenv_1.configDotenv)();
exports.default = {
    development: Object.assign({}, development_1.default),
    test: Object.assign({}, test_1.default),
}[process.env.NODE_ENV || 'development'];
