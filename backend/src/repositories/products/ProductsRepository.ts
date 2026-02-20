import { Product } from '../../types/Product';
import { WithId } from '../../types/WithId';

export interface ProductsRepository {
  findAll: () => Promise<WithId<Product>[]>;
  findById: (id: string) => Promise<WithId<Product>>;
  create: (product: Product) => Promise<WithId<Product>>;
  updateById: (id: string, product: Product) => Promise<WithId<Product>>;
  deleteById: (id: string) => Promise<WithId<Product>>;
}
