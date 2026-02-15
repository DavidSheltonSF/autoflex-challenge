import { Router } from 'express';
import { configProductsRoutes } from './products';
import { configCommoditiesRoutes } from './commodities';

export function configRouter(): Router {
  const router = Router();
  configProductsRoutes(router);
  configCommoditiesRoutes(router);
  return router;
}
