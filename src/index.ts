import express, { type Request, type Response } from 'express';
import { PostgreHelper } from './database/database';
import cookieParser from 'cookie-parser';
import { configRouter } from './routes/configRouter';

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(configRouter());
const port = 3001;
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

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
