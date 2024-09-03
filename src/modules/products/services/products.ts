import { ProductQueries } from "../queries/products";
//import { db } from "../../../config/database/db";
import pool from "../../../config/database/db";
//import { Product } from "../../products/queries/products";
import { ApiConstants } from "../../../helper/constants";
import { StatusCodes } from "../../../helper/statusCodes";
import { GenericHelper } from "../../../helper/generator";

export interface Product {
    
    name: string;
    category_id:string;
    description: string;
    price: number;
    stock: number;
    image: string;
}
export const ProductServices = {
    createProduct: async (product: Product) => {
        const { name,category_id, description, price, stock, image } = product;
        const id = GenericHelper.generateId();
        console.log(id)
        const checkCategory= (await pool.query(ProductQueries.getCategory,[category_id])).rows[0]
        console.log(JSON.stringify(checkCategory))
        if(!checkCategory){
            return{
                message: ApiConstants.CATEGORY_NOT_FOUND,
                code: StatusCodes.NOT_FOUND,
                data: null
            }
        }
        const result = (await pool.query(ProductQueries.createProduct, [id,name,category_id, description, price, stock, image])).rows[0];
        console.log(JSON.stringify(result))
        return{
            message: ApiConstants.PRODUCT_CREATED,
            code: StatusCodes.CREATED,
            data: result
        }
    }
}