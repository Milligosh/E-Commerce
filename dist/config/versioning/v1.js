"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = express_1.default.Router();
const user_1 = __importDefault(require("../../modules/users/routes/user"));
const blacklist_1 = __importDefault(require("../../modules/users/routes/blacklist"));
const admin_1 = __importDefault(require("../../modules/admins/routes/admin"));
const category_1 = __importDefault(require("../../modules/categories/routes/category"));
const products_1 = __importDefault(require("../../modules/products/routes/products"));
api.get("/", (req, res) => res.status(200).json({
    status: "success",
    message: "Welcome to My App API",
}));
api.use("/users", user_1.default);
api.use("/blacklist", blacklist_1.default);
api.use("/admin", admin_1.default);
api.use("/category", category_1.default);
api.use("/product", products_1.default);
exports.default = api;
