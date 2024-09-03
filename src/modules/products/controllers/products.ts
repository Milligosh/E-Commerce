import { Request, Response ,NextFunction} from "express";
import { ProductServices } from "../services/products";

export class ProductController {
    static async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, price, stock, image } = req.body;
            const category_id = req.params.categoryId;
            console.log(category_id)
            const result = await ProductServices.createProduct({...req.body,category_id});
            console.log(result)
            res.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
}