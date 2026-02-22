import { CommoditiesRepository } from '../../repositories/commodities/CommoditiesRepository';
import { Commodity } from '../../types/Commodity';

export class CommoditiesRepositoryMock implements CommoditiesRepository {
  findAllWasCalled: boolean = false;
  findByIdParam: { id: string } | null = null;
  createParam: Commodity | null = null;
  updateParam: { id: string; commodity: Commodity } | null = null;
  deleteParam: { id: string } | null = null;
  checkExistenceParam: { id: string } | null = null;

  async findAll() {
    this.findAllWasCalled = true;
    return [{ id: '2', code: 'comm1234', name: 'madeira', quantity: 120 }];
  }
  async findById(id: string) {
    this.findByIdParam = { id };
    return { id: '2', code: 'comm1234', name: 'madeira', quantity: 120 };
  }

  async create(commodity: Commodity) {
    this.createParam = commodity;
    return { id: '2', code: 'comm1234', name: 'madeira', quantity: 120 };
  }
  async updateById(id: string, commodity: Commodity) {
    this.updateParam = { id, commodity };
    return { id: '2', code: 'comm1234', name: 'madeira', quantity: 120 };
  }

  async deleteById(id: string) {
    this.deleteParam = { id };
    return { id: '2', code: 'comm1234', name: 'madeira', quantity: 120 };
  }

  async checkExistence(id: string) {
    this.checkExistenceParam = { id };
    return true;
  }
}
