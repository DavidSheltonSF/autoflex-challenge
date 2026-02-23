import { ProductsRepository } from '../../repositories/products/ProductsRepository';
import { ProductsCommoditiesRepository } from '../../repositories/productsCommoditiesRelation/ProductsCommoditiesRepository.ts';
import { Product } from '../../types/Product';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';

export class ProductsCommoditiesRepositoryMock implements ProductsCommoditiesRepository {
  createCommodityParam: { productCommodityRelation: ProductCommodityRelation } | null = null;
  deleteCommodityParam: { productId: string; commodityId: string } | null = null;
  findAllCommoditiesParam: { productId: string } | null = null;
  findAllProductsAndCommoditiesParamWasCalled: boolean = false;

  async findAllProductsAndCommodities() {
    this.findAllProductsAndCommoditiesParamWasCalled = true;
    return [
      {
        productId: '8',
        productCode: '88888888',
        productName: 'barra de ferro',
        price: 80,
        commodityQuantity: 7,
        availableCommodityQuantity: 80,
      },
    ];
  }

  async findAllCommodities(productId: string) {
    this.findAllCommoditiesParam = { productId };
    return [{ id: '8', code: 'comm1234', name: 'barra de ferro', quantity: 80 }];
  }

  async createCommodity(productCommodityRelation: ProductCommodityRelation) {
    this.createCommodityParam = { productCommodityRelation };
    return { id: '8', productId: 'prod1254', commodityId: 'comm5588', quantity: 80 };
  }

  async deleteCommodity(productId: string, commodityId: string) {
    this.deleteCommodityParam = { productId, commodityId };
    return { id: '8', productId: 'prod1254', commodityId: 'comm5588', quantity: 80 };
  }
}
