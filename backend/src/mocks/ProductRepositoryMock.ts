import { ProductsRepository } from '../repositories/products/ProductsRepository';
import { Product } from '../types/Product';

export class ProductRepositoryMock implements ProductsRepository {
  findAllWasCalled: boolean = false;
  findByIdParam: { id: string } | null = null;
  createParam: Product | null = null;
  updateParam: { id: string; product: Product } | null = null;
  deleteParam: { id: string } | null = null;
  checkExistenceParam: { id: string } | null = null;

  async findAll() {
    this.findAllWasCalled = true;
    return [{ id: '2', code: 'prod1254', name: 'cadeira', price: 120 }];
  }
  async findById(id: string) {
    this.findByIdParam = { id };
    return { id: '2', code: 'prod1254', name: 'cadeira', price: 120 };
  }

  async create(product: Product) {
    this.createParam = product;
    return { id: '2', code: 'prod1254', name: 'cadeira', price: 120 };
  }
  async updateById(id: string, product: Product) {
    this.updateParam = { id, product };
    return { id: '2', code: 'prod1254', name: 'cadeira', price: 120 };
  }

  async deleteById(id: string) {
    this.deleteParam = { id };
    return { id: '2', code: 'prod1254', name: 'cadeira', price: 120 };
  }

  async checkExistence(id: string) {
    this.checkExistenceParam = { id };
    return true;
  }
}
