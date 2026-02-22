import { PostgresCommoditiesRepository } from '../../repositories/commodities/PostgresCommoditiesRepository';
import { PostgresProductsRepository } from '../../repositories/products/PostgresProductsRepository';
import { CommoditiesService } from '../../services/commodities/CommoditiesService';
import { ProductService } from '../../services/products/ProductService';
import { IProductsController } from '../products/IProductsController';
import { ProductsController } from '../products/ProductsController';

export function makeProductsController(): IProductsController {
  const productsRepository = new PostgresProductsRepository();
  const commoditiesRepository = new PostgresCommoditiesRepository();
  const productsService = new ProductService(productsRepository);
  const commoditiesService = new CommoditiesService(commoditiesRepository);
  const productsController = new ProductsController(productsService, commoditiesService);
  return productsController;
}
