import { Product } from '../../types/Product';
import { WithId } from '../../types/WithId';

export interface IProductService {
  findAll: () => Promise<WithId<Product>[]>;
  findById: (id: string) => Promise<WithId<Product> | null>;
  create: (product: Product) => Promise<WithId<Product>>;
  updateById: (id: string, product: Product) => Promise<WithId<Product> | null>;
  deleteById: (id: string) => Promise<WithId<Product> | null>;
  checkExistence: (id: string) => Promise<boolean>;
}
