import { Product } from '../../types/Product';
import { WithId } from '../../types/WithId';

export interface ProductsRepository {
  findAll: () => Promise<WithId<Product[]>>;
  findById: () => Promise<WithId<Product>>;
  create: (product: Product) => Promise<WithId<Product>>;
  update: (id: string, product: Product) => Promise<WithId<Product>>;
  delete: (id: string) => Promise<WithId<Product>>;
}
