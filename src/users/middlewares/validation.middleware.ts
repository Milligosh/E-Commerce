const { responseProvider } = require("../../helper/helper");
import { Request, Response, NextFunction } from "express";

export const validateSignUpApplicantInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullname, username, password } = req.body;

    if (typeof email !== "string" || !email.includes("@")) {
      return responseProvider(res, null, "provide a valid email", 400);
    };

    if (typeof fullname !== "string" || !fullname) {
      return responseProvider(res, null, "provide a valid fullname", 400);
    };

    if (typeof username !== "string" || !username) {
      return responseProvider(res, null, "provide a valid username", 400);
    };
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (typeof password !== "string" || !passwordRegex.test(password)) {
      return responseProvider(
        res,
        null,
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
        400
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
