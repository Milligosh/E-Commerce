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
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./users/middlewares/error.middleware");
const v1_1 = __importDefault(require("./config/versioning/v1"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./config/database/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM users');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
app.use("/api/v1", v1_1.default);
app.use(error_middleware_1.appErrorHandler);
app.use(error_middleware_1.genericErrorHandler);
app.use(error_middleware_1.notFound);
// in your main index.ts or wherever you define your routes
const blacklist_middleware_1 = require("./users/middlewares/blacklist.middleware");
// Apply the middleware to protected routes
app.get("/api/v1/protected-route", blacklist_middleware_1.checkBlacklist, (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "You have access to this route",
        code: 200,
        data: null,
    });
});
app.use((error, req, res, next) => {
    var _a;
    res.status((_a = error === null || error === void 0 ? void 0 : error.code) !== null && _a !== void 0 ? _a : 500).json(error);
});
