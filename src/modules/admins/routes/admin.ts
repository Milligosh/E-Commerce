import express from "express";
const router = express.Router();
import { AdminController } from "../controllers/admin";
import authenticateToken, {
  verifyToken,
  isSuperAdmin,
  isAdmin,
} from "../../../middlewares/authorization";

router.post(
  "/createAdmin",
  authenticateToken,
  isSuperAdmin,
  AdminController.createAdmin
);
export default router