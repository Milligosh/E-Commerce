import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/admin";

export class AdminController {
  static async createAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.createAdmin(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
}