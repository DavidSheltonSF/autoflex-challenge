import express, { type Request, type Response } from 'express';
import { PostgreHelper } from './database/database';
import cookieParser from 'cookie-parser';
import { configRouter } from './routes/configRouter';
import cors from 'cors';
import { config } from 'dotenv';
config();

export const app = express();
const allowedOrigins = [process.env.FRONTEND];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by cors'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(configRouter());
const port = 3002;
export const dbConnection = PostgreHelper.getInstance();

(async () => {
  try {
    await dbConnection.connect();
    // await dbConnection.resetTables();
    console.log('Connected');
  } catch (error: any) {
    console.log(error);
  }

  app.get('/', (req: Request, res: Response) => {
    return res.json('API is working');
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
})();
