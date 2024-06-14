import express from "express";
import { UserControllers } from "../controllers/user";
const router = express.Router();

// router.post("/signup", UserControllers.createUser);
router.post("/signup", UserControllers.createUser);
router.post('/verify-otp', UserControllers.verifyOTP);

export default router;
