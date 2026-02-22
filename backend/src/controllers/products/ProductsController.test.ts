import { describe, expect, test } from '@jest/globals';
import { ProductRepositoryMock } from '../../mocks/ProductRepositoryMock';
import { ProductService } from '../../services/products/ProductService';
import { ProductsController } from './ProductsController';
import { HttpRequest } from '../types/HttpRequest';

describe('Testing ProductControlelr', () => {
  function mockup() {
    const productRepository = new ProductRepositoryMock();
    const productService = new ProductService(productRepository);
    const productsController = new ProductsController(productService);

    return {
      productRepository,
      productService,
      productsController,
    };
  }

  test('should call productRepository.findAll()', async () => {
    const { productsController, productRepository } = mockup();
    await productsController.findAll({});
    expect(productRepository.findAllWasCalled).toBeTruthy();
  });

  test('should call productRepository.findById() with the id provided and return OK (200)', async () => {
    const { productsController, productRepository } = mockup();
    const id = '22';
    const httpRequest: HttpRequest = {
      params: { id },
    };
    const response = await productsController.findById(httpRequest);

    expect(productRepository.findByIdParam?.id).toBe(id);
    expect(response.status).toBe(200);
  });

  test('should call productRepository.create() with data provided and return OK (200)', async () => {
    const { productsController, productRepository } = mockup();

    const newProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const httpRequest: HttpRequest = {
      body: newProduct,
    };
    const response = await productsController.create(httpRequest);

    expect(response.status).toBe(200);
    expect(productRepository.createParam?.code).toBe(newProduct.code);
    expect(productRepository.createParam?.name).toBe(newProduct.name);
    expect(productRepository.createParam?.price).toBe(newProduct.price);
  });

  test('should not call productRepository.create and return UNPROCESSABLE_CONTENT (422) if a invalid field is provided', async () => {
    const { productsController, productRepository } = mockup();

    const newProduct = {
      code: 'invalideraearae1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const httpRequest: HttpRequest = {
      body: newProduct,
    };

    const result = await productsController.create(httpRequest);

    expect(result.status).toBe(422);
    expect(productRepository.createParam).toBeFalsy();
  });

  test('should not call productRepository.create and return UNPROCESSABLE_CONTENT (422) if required fields are missing', async () => {
    const { productsController, productRepository } = mockup();

    const newProduct = {
      code: 'invalideraearae1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const httpRequest: HttpRequest = {
      body: newProduct,
    };

    const result = await productsController.create(httpRequest);

    expect(result.status).toBe(422);
    expect(productRepository.createParam).toBeFalsy();
  });

  test('should call productRepository.updateById with id and data provided and return OK (200)', async () => {
    const { productsController, productRepository } = mockup();

    const id = '22';
    const product = {
      code: 'prod1234',
      name: 'cadeira de ferro-updated',
      price: 500,
    };

    const httpRequest: HttpRequest = {
      params: { id },
      body: product,
    };

    const response = await productsController.updateById(httpRequest);

    expect(response.status).toBe(200);
    expect(productRepository.updateParam?.id).toBe(id);
    expect(productRepository.updateParam?.product.code).toBe(product.code);
    expect(productRepository.updateParam?.product.name).toBe(product.name);
    expect(productRepository.updateParam?.product.price).toBe(product.price);
  });

  test('should not call productRepository.updateById with id and data provided and return BAD_REQUEST (400) if required fields are missing', async () => {
    const { productsController, productRepository } = mockup();

    const id = '22';
    const product = {
      name: 'cadeira de ferro-updated',
    };

    const httpRequest: HttpRequest = {
      params: { id },
      body: product,
    };

    const response = await productsController.updateById(httpRequest);
    console.log(response);

    expect(response.status).toBe(400);
    expect(productRepository.updateParam).toBeFalsy();
  });

  test('should call productRepository.deleteById with the id provided and return OK (200)', async () => {
    const { productsController, productRepository } = mockup();

    const id = '22';
    const httpRequest: HttpRequest = {
      params: { id },
    };

    const response = await productsController.deleteById(httpRequest);
    expect(response.status).toBe(200);
    expect(productRepository.deleteParam?.id).toBe(id);
  });
});
