import { PostgresProductsRepository } from '../../repositories/products/PostgresProductsRepository';
import { ProductService } from '../../services/products/ProductService';
import { IProductsController } from '../products/IProductsController';
import { ProductsController } from '../products/ProductsController';

export function makeProductsController(): IProductsController {
  const productsRepository = new PostgresProductsRepository();
  const productsService = new ProductService(productsRepository);
  const productsController = new ProductsController(productsService);
  return productsController;
}
