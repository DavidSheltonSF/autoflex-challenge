import { Router } from 'express';
import { configProductsRoutes } from './products';
import { configCommoditiesRoutes } from './commodities';
import { configproductsCommoditiesRoutes } from './productsCommodities';

export function configRouter(): Router {
  const router = Router();
  configProductsRoutes(router);
  configCommoditiesRoutes(router);
  configproductsCommoditiesRoutes(router);
  return router;
}
