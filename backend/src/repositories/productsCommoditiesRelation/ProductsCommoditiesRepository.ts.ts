import { Commodity } from '../../types/Commodity';
import { Product } from '../../types/Product';
import { ProductAndCommodity } from '../../types/ProductAndCommodity';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';
import { WithId } from '../../types/WithId';

export interface ProductsCommoditiesRepository {
  findAllProductsAndCommodities: () => Promise<ProductAndCommodity[]>;
  findAllCommodities: (productId: string) => Promise<WithId<Commodity>[]>;
  createCommodity: (
    productCommodityRelation: ProductCommodityRelation
  ) => Promise<WithId<ProductCommodityRelation>>;
  deleteCommodity: (
    productId: string,
    commodityId: string
  ) => Promise<WithId<ProductCommodityRelation>>;
}

