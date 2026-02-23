import { describe, expect, test } from '@jest/globals';
import { ProductsRepositoryMock } from '../../tests/mocks/ProductsRepositoryMock';
import { ProductService } from './ProductService';
import { InvalidCodeError } from '../errors/InvalidCodeError';
import { ProductsCommoditiesRepositoryMock } from '../../tests/mocks/ProductsCommoditiesRepositoryMock';

describe('Testing ProductService', () => {
  function mockup() {
    const productRepository = new ProductsRepositoryMock();
    const productsCommoditiesRepository = new ProductsCommoditiesRepositoryMock();
    const productService = new ProductService(productRepository, productsCommoditiesRepository);

    return {
      productRepository,
      productService,
    };
  }

  test('should call productRepository.findAll()', async () => {
    const { productService, productRepository } = mockup();

    await productService.findAll();
    expect(productRepository.findAllWasCalled).toBeTruthy();
  });

  test('should call productRepository.findById() with the id provided', async () => {
    const { productService, productRepository } = mockup();
    const id = '656';
    await productService.findById(id);
    expect(productRepository.findByIdParam?.id).toBe(id);
  });

  test('should call productRepository.create() with data provided', async () => {
    const { productService, productRepository } = mockup();

    const newProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro',
      price: 500,
    };
    await productService.create(newProduct);

    expect(productRepository.createParam?.code).toBe(newProduct.code);
    expect(productRepository.createParam?.name).toBe(newProduct.name);
    expect(productRepository.createParam?.price).toBe(newProduct.price);
  });

  test('should throw InvalidCodeError and do not call productRepository.create', async () => {
    const { productService, productRepository } = mockup();
    const newProduct = {
      code: 'invalideraearae1234',
      name: 'cadeira de ferro',
      price: 500,
    };
    let err;
    try {
      await productService.create(newProduct);
    } catch (error: any) {
      err = error;
    } finally {
      expect(productRepository.createParam).toBeFalsy();
      expect(err instanceof InvalidCodeError).toBeTruthy();
    }
  });

  test('should call productRepository.updateById with id and data provided', async () => {
    const { productService, productRepository } = mockup();

    const id = '22';
    const updatedProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro-updated',
      price: 500,
    };

    await productService.updateById(id, updatedProduct);

    expect(productRepository.updateParam?.id).toBe(id);
    expect(productRepository.updateParam?.product.code).toBe(updatedProduct.code);
    expect(productRepository.updateParam?.product.name).toBe(updatedProduct.name);
    expect(productRepository.updateParam?.product.price).toBe(updatedProduct.price);
  });

  test('should call productRepository.deleteById with the id provided', async () => {
    const { productService, productRepository } = mockup();
    const id = '6';
    await productService.deleteById(id);
    expect(productRepository.deleteParam?.id).toBe(id);
  });

  test('should call productRepository.checkExistence with the id provided', async () => {
    const { productService, productRepository } = mockup();
    const id = '55';
    await productService.checkExistence(id);
    expect(productRepository.checkExistenceParam?.id).toBe(id);
  });

  test('should call productRepository.findAllCommodities()', async () => {
    const { productService, productRepository } = mockup();

    const productId = 'prod1234';
    await productService.findAllCommodities(productId);
    expect(productRepository.findAllCommoditiesParam?.productId).toBe(productId);
  });

  test('should call productRepository.addCommodity with the provided data', async () => {
    const { productService, productRepository } = mockup();

    const newProductCommodity = { productId: 'prod1234', commodityId: 'comm1234', quantity: 50 };

    await productService.addCommodity(newProductCommodity);

    expect(productRepository.addCommodityParam?.productCommodityRelation.productId).toBe(
      newProductCommodity.productId
    );
    expect(productRepository.addCommodityParam?.productCommodityRelation.commodityId).toBe(
      newProductCommodity.commodityId
    );

    expect(productRepository.addCommodityParam?.productCommodityRelation.quantity).toBe(
      newProductCommodity.quantity
    );
  });

  test('should call productRepository.removeCommodity with the provided id', async () => {
    const { productService, productRepository } = mockup();

    const productId = 'prod1234';
    const commodityId = 'comm1234';
    await productService.removeCommodity(productId, commodityId);

    expect(productRepository.removeCommodityParam?.productId).toBe(productId);
    expect(productRepository.removeCommodityParam?.commodityId).toBe(commodityId);
  });
});
