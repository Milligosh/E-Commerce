// users/middlewares/checkBlacklist.ts
import { Request, Response, NextFunction } from "express";
import { BlacklistService } from "../services/blacklist";

export const checkBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      status: "Error",
      message: "No token provided",
      code: 400,
      data: null,
    });
  }

  const isBlacklisted = await BlacklistService.isTokenBlacklisted(token);
  if (isBlacklisted) {
    return res.status(401).json({
      status: "Error",
      message: "Token is blacklisted",
      code: 401,
      data: null,
    });
  }

  next();
};
