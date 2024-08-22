import express from "express";
import { UserControllers } from "../controllers/user";
const router = express.Router();
import { validateSignUpApplicantInput } from "../../../middlewares/validation.middleware";

// router.post("/signup", UserControllers.createUser);
router.post(
  "/signup",
  validateSignUpApplicantInput,
  UserControllers.createUser
);
router.post("/verify-otp", UserControllers.verifyOTP);
router.post("/login", UserControllers.logIn);

export default router;
