import { Request, Response ,NextFunction, response} from "express";
import { ProductServices } from "../services/products";

export class ProductController {
    static async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, price, stock, image } = req.body;
            const category_id = req.params.categoryId;
            const result = await ProductServices.createProduct({...req.body,category_id});
            res.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
    static async deleteProduct(req:Request, res:Response,next:NextFunction){
        try {
            const id= req.params.id
            console.log(id)
            const result = await ProductServices.deleteProduct(id)
            console.log(result)
            return res.status(result.code).json(result)
        } catch (error) {
            next(error)
        }
    }
}