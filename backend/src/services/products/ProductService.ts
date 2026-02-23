import { ProductsRepository } from '../../repositories/products/ProductsRepository';
import { ProductsCommoditiesRepository } from '../../repositories/productsCommoditiesRelation/ProductsCommoditiesRepository.ts';
import { Commodity } from '../../types/Commodity';
import { GroupedProductsAndCommodities } from '../../types/GroupedProductsAndCommodities';
import { Product } from '../../types/Product';
import { ProductAndCommodity } from '../../types/ProductAndCommodity';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';
import { WithId } from '../../types/WithId';
import { getViableProducts } from '../../utils/getViableProducts';
import { validateQuantity } from '../helper/fieldsValidators';
import { validadeProduct } from '../helper/validateProduct';
import { IProductService } from './IProductService';

export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productsCommoditiesRepository: ProductsCommoditiesRepository
  ) {}

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

  async updateById(id: string, product: Product): Promise<WithId<Product>> {
    validadeProduct(product);
    return await this.productRepository.updateById(id, product);
  }

  async deleteById(id: string): Promise<WithId<Product>> {
    return await this.productRepository.deleteById(id);
  }

  async checkExistence(id: string): Promise<boolean> {
    return this.productRepository.checkExistence(id);
  }

  async findAllCommodities(productId: string): Promise<WithId<Commodity>[]> {
    return this.productsCommoditiesRepository.findAllCommodities(productId);
  }

  async addCommodity(
    productCommodityRelation: ProductCommodityRelation
  ): Promise<WithId<ProductCommodityRelation>> {
    const { quantity } = productCommodityRelation;
    validateQuantity(quantity);
    return this.productsCommoditiesRepository.createCommodity(productCommodityRelation);
  }

  async removeCommodity(
    productId: string,
    commodityId: string
  ): Promise<WithId<ProductCommodityRelation>> {
    return this.productsCommoditiesRepository.deleteCommodity(productId, commodityId);
  }

  async findAllAvailableProducts(): Promise<ProductAndCommodity[]> {
    const result = await this.productsCommoditiesRepository.findAllProductsAndCommodities();
    let groupedRowsByProductIdObj: Record<string, any[]> = {};
    result.forEach((row) => {
      if (groupedRowsByProductIdObj[row.productId] === undefined) {
        groupedRowsByProductIdObj[row.productId] = [];
      }
      groupedRowsByProductIdObj[row.productId]?.push(row);
    });

    const groupedRowsByProductId: GroupedProductsAndCommodities =
      Object.values(groupedRowsByProductIdObj);
    const viableProducts = getViableProducts(groupedRowsByProductId);

    return viableProducts;
  }
}
