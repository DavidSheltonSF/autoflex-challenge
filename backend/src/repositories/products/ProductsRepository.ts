import { Commodity } from '../../types/Commodity';
import { Product } from '../../types/Product';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';
import { WithId } from '../../types/WithId';

export interface ProductsRepository {
  findAll: () => Promise<WithId<Product>[]>;
  findById: (id: string) => Promise<WithId<Product> | null>;
  create: (product: Product) => Promise<WithId<Product>>;
  updateById: (id: string, product: Product) => Promise<WithId<Product>>;
  deleteById: (id: string) => Promise<WithId<Product>>;
  checkExistence: (id: string) => Promise<boolean>;
  findAllCommodities: (productId: string) => Promise<WithId<Commodity>[]>;
  addCommodity: (
    productCommodityRelation: ProductCommodityRelation
  ) => Promise<WithId<ProductCommodityRelation>>;
  removeCommodity: (
    productId: string,
    commodityId: string
  ) => Promise<WithId<ProductCommodityRelation>>;
}
