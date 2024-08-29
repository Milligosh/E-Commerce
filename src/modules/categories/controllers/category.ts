import {Request,Response,NextFunction} from 'express'
import { CategoryQueries } from '../queries/category'
import { CategoryServices } from '../services/category'
import authenticate from '../../../middlewares/authorization'

export class CategoryController{
    static async createCategory(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            const result =await CategoryServices.createCategory(req.body)
            return res.status(result.code).json(result)
        } catch (error) {
           next (error )
        }
    }
}