import { type Request, type Response } from 'express';
import { HttpRequest } from '../../controllers/types/HttpRequest';
import { HttpResponse } from '../../controllers/types/HttpResponse';

export function expressHttpAdapter<T>(
  controllerHandler: (httpRequest: HttpRequest) => Promise<HttpResponse<T>>
) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    };

    const result = await controllerHandler(httpRequest);
    return res.status(result.status).json(result);
  };
}
