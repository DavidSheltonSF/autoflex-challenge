import { Router } from 'express';
import { makeCommoditiesController } from '../controllers/factories/makeCommoditiesController';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';

const commoditiesController = makeCommoditiesController();

export function configCommoditiesRoutes(router: Router) {
  router.post('/commodities', expressHttpAdapter(commoditiesController.create));
  router.get('/commodities', expressHttpAdapter(commoditiesController.findAll));
  router.get('/commodities/:id', expressHttpAdapter(commoditiesController.findById));
  router.put('/commodities/:id', expressHttpAdapter(commoditiesController.updateById));
  router.delete('/commodities/:id', expressHttpAdapter(commoditiesController.deleteById));
}
