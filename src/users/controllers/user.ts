import {Request,Response,NextFunction} from 'express'
import { Userservice } from '../services/user.services'

export class UserControllers{
    static async createUser( request: Request,
        response: Response,
        next: NextFunction):Promise<any>{
            try {
                const result= await Userservice.createUser(request.body)
                return response.status(result.code).json(result) 
            } catch (error) {
                next (error)
            }
        }

        static async verifyOTP(
            request:Request,
            response:Response,
            next:NextFunction
        ):Promise<any>{
            try {
                const {email,otp}= request.body
                const result= await Userservice.verifyOTP(email,otp)
                return response.status(result.code).json(result)
            } catch (error) {
                next (error)
            }
        }
}