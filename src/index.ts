import express, {Request, Response,NextFunction, json} from 'express';
import { appErrorHandler,genericErrorHandler,notFound } from './users/middlewares/error.middleware';
import api from './config/versioning/v1';
const app = express()
import pool from './config/database/db';
import dotenv from 'dotenv'


dotenv.config()

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/users', async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
})
app.use("/api/v1", api);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound)

// in your main index.ts or wherever you define your routes
import { checkBlacklist } from "./users/middlewares/blacklist.middleware";

// Apply the middleware to protected routes
app.get("/api/v1/protected-route", checkBlacklist, (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    message: "You have access to this route",
    code: 200,
    data: null,
  });
});



app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.code ?? 500).json(error);
});

