import { AdminQueries } from "../queries/admin";
import pool from "../../../config/database/db";
import { ApiConstants } from "../../../helper/constants";
import { GenericHelper } from "../../../helper/generator";
import bcrypt from "bcrypt";
import { StatusCodes } from "../../../helper/statusCodes";

export class AdminService {
  static async createAdmin(body: any): Promise<any> {
    const { email, fullname, username } = body;
    const existingAdmin = (
      await pool.query(AdminQueries.getAdminByEmail, [email])
    ).rows[0];
    if (existingAdmin) {
      return {
        message: ApiConstants.ADMIN_EXIST,
        code: StatusCodes.CONFLICT,
        data: null,
      };
    }
    const id = GenericHelper.generateId();
    const newRequest = { id, ...body };
    const password = GenericHelper.generateComplexPassword();
    const saltRounds: number = 12;
    const hashPassword: string = bcrypt.hashSync(
      password as string,
      saltRounds
    );

    await GenericHelper.sendCredentialsEmail(email, password);
    const create = (
      await pool.query(AdminQueries.createAdmin, [
        id,
        fullname,
        username,
        email,
        hashPassword,
        "admin",
        true,
      ])
    ).rows[0];
    return {
      message: ApiConstants.ADMIN_CREATED,
      code:StatusCodes.CREATED,
      data: create,
    };
  }
}
