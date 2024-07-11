// users/routes/blacklist.ts
import express from "express";
import { BlacklistController } from "../controllers/blacklist";
const router = express.Router();

router.post('/logout', BlacklistController.blacklistToken);

export default router;
