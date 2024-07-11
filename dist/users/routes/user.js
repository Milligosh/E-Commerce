"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
const validation_middleware_1 = require("../middlewares/validation.middleware");
// router.post("/signup", UserControllers.createUser);
router.post("/signup", validation_middleware_1.validateSignUpApplicantInput, user_1.UserControllers.createUser);
router.post('/verify-otp', user_1.UserControllers.verifyOTP);
router.post('/login', user_1.UserControllers.logIn);
exports.default = router;
