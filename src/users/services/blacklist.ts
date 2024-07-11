// users/services/blacklist.services.ts
import pool from "../../config/database/db";
import { BlacklistQueries } from "../queries/blacklist";

export class BlacklistService {
  static async blacklistToken(token: string): Promise<any> {
    try {
      await pool.query(BlacklistQueries.addToken, [token]);

      return {
        status: "Success",
        message: "Token blacklisted successfully",
        code: 200,
        data: null,
      };
    } catch (error) {
      console.error("Error blacklisting token:", error);
      return {
        status: "Error",
        message: "An error occurred while blacklisting the token",
        code: 500,
        data: null,
      };
    }
  }

  static async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await pool.query(BlacklistQueries.checkToken, [token]);
    console.log("######");
    return result.rows.length > 0;
  }
}
