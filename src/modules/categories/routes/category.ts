import express from 'express'
import { UserControllers } from '../../users/controllers/user'
import { CategoryController } from '../controllers/category'
import authenticateToken, {
    verifyToken,
    isSuperAdmin,
    isAdmin,
  } from "../../../middlewares/authorization";
const router = express.Router()
router.post('/create-category',authenticateToken,isAdmin,CategoryController.createCategory)

export default router
