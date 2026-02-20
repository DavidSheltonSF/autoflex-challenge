import express, { type Request, type Response } from 'express';
import { PostgreHelper } from './database/database';
import cookieParser from 'cookie-parser';
import { configRouter } from './routes/configRouter';
import cors from 'cors';

export const app = express();
 const allowedOrigins = [process.env.FRONTEND, 'http://192.168.0.118:3002'];
 app.use(
   cors({
     origin: (origin, callback) => {
       if (!origin) return callback(null, true);

       if (allowedOrigins.includes(origin)) {
         return callback(null, true);
       }

       return callback(new Error('Not allowed by cores'));
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
