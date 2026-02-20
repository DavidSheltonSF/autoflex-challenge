import { Commodity } from '../../types/Commodity';
import { WithId } from '../../types/WithId';

export interface CommoditiesRepository {
  findAll: () => Promise<WithId<Commodity>[]>;
  findById: (id: string) => Promise<WithId<Commodity>>;
  create: (commodity: Commodity) => Promise<WithId<Commodity>>;
  updateById: (id: string, commodity: Commodity) => Promise<WithId<Commodity>>;
  deleteById: (id: string) => Promise<WithId<Commodity>>;

}
