import pool from "../../../config/database/db";
import { CategoryQueries } from "../queries/category";
import { GenericHelper } from "../../../helper/generator";
import { ApiConstants } from "../../../helper/constants";
import { StatusCodes } from "../../../helper/statusCodes";

export class CategoryServices{
    static async createCategory(body:any):Promise<any>{
        const {name}=body
        const id =GenericHelper.generateId()
        const checkNameUniqueness= (await pool.query(CategoryQueries.checkNameUniqueness,[name])).rows[0]
        if(checkNameUniqueness){
            return{
                message:ApiConstants.CATEGORY_ALREADY_EXISTS,
                code:StatusCodes.CONFLICT,
                data:null
            }
        }
        const createCategory= (await pool.query(CategoryQueries.createCategory,[id,name])).rows[0]
        
        return{
                message: ApiConstants.CATEGORY_CREATED,
                code: StatusCodes.CREATED,
                data: createCategory,
    }
}
}