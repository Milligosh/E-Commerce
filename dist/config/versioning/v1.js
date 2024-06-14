"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = express_1.default.Router();
const user_1 = __importDefault(require("../../users/routes/user"));
api.get("/", (req, res) => res.status(200).json({
    status: "success",
    message: "Welcome to My App API",
}));
api.use("/users", user_1.default);
//api.use("/tasks", tasks )
exports.default = api;
