import { Router } from "express";
import { ProductController } from "../controllers/products";
import authenticateToken, {
    verifyToken,
    isSuperAdmin,
    isAdmin,
  } from "../../../middlewares/authorization";

const router = Router();

router.post('/:categoryId/create-product', authenticateToken, isAdmin, ProductController.createProduct);

export default router;

