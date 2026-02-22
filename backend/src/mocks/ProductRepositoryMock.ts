import { ProductsRepository } from '../repositories/products/ProductsRepository';
import { Product } from '../types/Product';
import { ProductCommodityRelation } from '../types/ProductCommodityRelation';
import { WithId } from '../types/WithId';

export class ProductRepositoryMock implements ProductsRepository {
  findAllWasCalled: boolean = false;
  findByIdParam: { id: string } | null = null;
  createParam: Product | null = null;
  updateParam: { id: string; product: Product } | null = null;
  deleteParam: { id: string } | null = null;
  checkExistenceParam: { id: string } | null = null;
  addCommodityParam: { productCommodityRelation: ProductCommodityRelation } | null = null;
  removeCommodityParam: { productId: string; commodityId: string } | null = null;

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

  async addCommodity(productCommodityRelation: ProductCommodityRelation) {
    this.addCommodityParam = { productCommodityRelation };
    return { id: '8', productId: 'prod1254', commodityId: 'comm5588', quantity: 80 };
  }

  async removeCommodity(productId: string, commodityId: string) {
    this.removeCommodityParam = { productId, commodityId };
    return { id: '8', productId: 'prod1254', commodityId: 'comm5588', quantity: 80 };
  }
}
