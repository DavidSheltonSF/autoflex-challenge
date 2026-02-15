import { Router } from 'express';
import { configProductsRoutes } from './products';

export function configRouter(): Router {
  const router = Router();
  configProductsRoutes(router);
  return router;
}
