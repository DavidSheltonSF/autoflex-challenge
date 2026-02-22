import { describe, expect, test } from '@jest/globals';
import { ProductRepositoryMock } from '../../mocks/ProductRepositoryMock';
import { ProductService } from './ProductService';
import { InvalidCodeError } from '../errors/InvalidCodeError';

describe('Testing PostgresProductRepository', () => {
  function mockup() {
    const productRepository = new ProductRepositoryMock();
    const productService = new ProductService(productRepository);

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
});
