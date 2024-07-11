// users/controllers/blacklist.controller.ts
import { Request, Response, NextFunction } from "express";
import { BlacklistService } from "../services/blacklist";

export class BlacklistController {
  static async blacklistToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return response.status(400).json({
          status: "Error",
          message: "No token provided",
          code: 400,
          data: null,
        });
      }
      const result = await BlacklistService.blacklistToken(token);
      return response.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
}
