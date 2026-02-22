import { ProductsRepository } from '../../repositories/products/ProductsRepository';
import { Product } from '../../types/Product';
import { WithId } from '../../types/WithId';
import { validadeProduct } from '../helper/validateProduct';
import { IProductService } from './IProductService';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async findAll(): Promise<WithId<Product>[]> {
    return await this.productRepository.findAll();
  }

  async findById(id: string): Promise<WithId<Product> | null> {
    return await this.productRepository.findById(id);
  }

  async create(product: Product): Promise<WithId<Product>> {
    validadeProduct(product);
    return await this.productRepository.create(product);
  }

  async updateById(id: string, product: Product): Promise<WithId<Product> | null> {
    validadeProduct(product);
    const exists = await this.checkExistence(id);
    if (!exists) {
      return null;
    }
    return await this.productRepository.updateById(id, product);
  }

  async deleteById(id: string): Promise<WithId<Product> | null> {
    const exists = this.checkExistence(id);
    if (!exists) {
      return null;
    }
    return await this.productRepository.deleteById(id);
  }

  async checkExistence(id: string): Promise<boolean> {
    return this.productRepository.checkExistence(id);
  }
}
