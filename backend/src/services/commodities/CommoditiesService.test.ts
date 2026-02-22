import { describe, expect, test } from '@jest/globals';
import { CommoditiesService } from './CommoditiesService';
import { InvalidCodeError } from '../errors/InvalidCodeError';
import { CommoditiesRepositoryMock } from '../../tests/mocks/CommoditiesRepositoryMock';

describe('Testing CommoditiesService', () => {
  function mockup() {
    const commodityRepository = new CommoditiesRepositoryMock();
    const commoditiesService = new CommoditiesService(commodityRepository);

    return {
      commodityRepository,
      commoditiesService,
    };
  }

  test('should call commodityRepository.findAll()', async () => {
    const { commoditiesService, commodityRepository } = mockup();
    await commoditiesService.findAll();
    expect(commodityRepository.findAllWasCalled).toBeTruthy();
  });

  test('should call commodityRepository.findById() with the id provided', async () => {
    const { commoditiesService, commodityRepository } = mockup();
    const id = '656';
    await commoditiesService.findById(id);
    expect(commodityRepository.findByIdParam?.id).toBe(id);
  });

  test('should call commodityRepository.create() with data provided', async () => {
    const { commoditiesService, commodityRepository } = mockup();

    const newCommodity = {
      code: 'comm1234',
      name: 'barra de ferro',
      quantity: 50,
    };
    await commoditiesService.create(newCommodity);

    expect(commodityRepository.createParam?.code).toBe(newCommodity.code);
    expect(commodityRepository.createParam?.name).toBe(newCommodity.name);
    expect(commodityRepository.createParam?.quantity).toBe(newCommodity.quantity);
  });

  test('should throw InvalidCodeError and do not call commodityRepository.create', async () => {
    const { commoditiesService, commodityRepository } = mockup();
    const newCommodity = {
      code: 'grfdgfdgrgasdfgd',
      name: 'barra de ferro',
      quantity: 50,
    };
    let err;
    try {
      await commoditiesService.create(newCommodity);
    } catch (error: any) {
      err = error;
    } finally {
      expect(commodityRepository.createParam).toBeFalsy();
      expect(err instanceof InvalidCodeError).toBeTruthy();
    }
  });

  test('should call commodityRepository.updateById with id and data provided', async () => {
    const { commoditiesService, commodityRepository } = mockup();

    const id = '22';
    const updatedCommodity = {
      code: 'comm1234',
      name: 'barra de ferro',
      quantity: 50,
    };

    await commoditiesService.updateById(id, updatedCommodity);

    expect(commodityRepository.updateParam?.id).toBe(id);
    expect(commodityRepository.updateParam?.commodity.code).toBe(updatedCommodity.code);
    expect(commodityRepository.updateParam?.commodity.name).toBe(updatedCommodity.name);
    expect(commodityRepository.updateParam?.commodity.quantity).toBe(updatedCommodity.quantity);
  });

  test('should call commodityRepository.deleteById with the id provided', async () => {
    const { commoditiesService, commodityRepository } = mockup();
    const id = '6';
    await commoditiesService.deleteById(id);
    expect(commodityRepository.deleteParam?.id).toBe(id);
  });

  test('should call commodityRepository.checkExistence with the id provided', async () => {
    const { commoditiesService, commodityRepository } = mockup();
    const id = '55';
    await commoditiesService.checkExistence(id);
    expect(commodityRepository.checkExistenceParam?.id).toBe(id);
  });
});
