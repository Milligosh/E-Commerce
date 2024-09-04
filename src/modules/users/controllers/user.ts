import { Request, Response, NextFunction } from "express";
import { Userservice } from "../services/user.services";

export class UserControllers {
  static async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await Userservice.createUser(request.body);
      return response.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async verifyOTP(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, otp } = request.body;
      const result = await Userservice.verifyOTP(email, otp);
      return response.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async logIn(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = request.body;
      const result = await Userservice.logIn(request.body);
      return response.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async createRatings(req: Request, res: Response, next: NextFunction):Promise<any> {
    try {
      const { rating, comment } = req.body;
      const product_id = req.params.product_id;
      const user_id = req.params.user_id;
      const result = await Userservice.createRatings({
        ...req.body,
        product_id,
        user_id,
      });
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async fetchProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
          searchTerm,
          categoryId,
          minPrice,
          maxPrice,
          minRating
      } = req.query;

      const result = await Userservice.fetchProducts(
          searchTerm as string | undefined,
          categoryId as string | undefined,
          minPrice ? Number(minPrice) : undefined,
          maxPrice ? Number(maxPrice) : undefined,
          minRating ? Number(minRating) : undefined
      );

      res.status(result.code).json(result);
  } catch (error) {
      next(error);
  }
}
}
