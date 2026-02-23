import { describe, expect, test } from '@jest/globals';
import { ProductService } from '../../services/products/ProductService';
import { ProductsController } from './ProductsController';
import { HttpRequest } from '../types/HttpRequest';
import { ProductsRepositoryMock } from '../../tests/mocks/ProductsRepositoryMock';
import { CommoditiesRepositoryMock } from '../../tests/mocks/CommoditiesRepositoryMock';
import { CommoditiesService } from '../../services/commodities/CommoditiesService';
import { ProductsCommoditiesRepositoryMock } from '../../tests/mocks/ProductsCommoditiesRepositoryMock';

describe('Testing ProductsController', () => {
  function mockup() {
    const productsRepository = new ProductsRepositoryMock();
    const commoditiesRepository = new CommoditiesRepositoryMock();
    const productsCommoditiesRepository = new ProductsCommoditiesRepositoryMock();
    const productsService = new ProductService(productsRepository, productsCommoditiesRepository);
    const commoditiesService = new CommoditiesService(commoditiesRepository);
    const productsController = new ProductsController(productsService, commoditiesService);

    return {
      productsRepository,
      productsService,
      productsController,
    };
  }

  test('should call productsRepository.findAll()', async () => {
    const { productsController, productsRepository } = mockup();
    await productsController.findAll({});
    expect(productsRepository.findAllWasCalled).toBeTruthy();
  });

  test('should call productsRepository.findById() with the id provided and return OK (200)', async () => {
    const { productsController, productsRepository } = mockup();
    const id = '22';
    const httpRequest: HttpRequest = {
      params: { id },
    };
    const response = await productsController.findById(httpRequest);

    expect(productsRepository.findByIdParam?.id).toBe(id);
    expect(response.status).toBe(200);
  });

  test('should call productsRepository.create() with data provided and return OK (200)', async () => {
    const { productsController, productsRepository } = mockup();

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
    expect(productsRepository.createParam?.code).toBe(newProduct.code);
    expect(productsRepository.createParam?.name).toBe(newProduct.name);
    expect(productsRepository.createParam?.price).toBe(newProduct.price);
  });

  test('should not call productsRepository.create and return UNPROCESSABLE_CONTENT (422) if a invalid field is provided', async () => {
    const { productsController, productsRepository } = mockup();

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
    expect(productsRepository.createParam).toBeFalsy();
  });

  test('should not call productsRepository.create and return UNPROCESSABLE_CONTENT (422) if required fields are missing', async () => {
    const { productsController, productsRepository } = mockup();

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
    expect(productsRepository.createParam).toBeFalsy();
  });

  test('should call productsRepository.updateById with id and data provided and return OK (200)', async () => {
    const { productsController, productsRepository } = mockup();

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
    expect(productsRepository.updateParam?.id).toBe(id);
    expect(productsRepository.updateParam?.product.code).toBe(product.code);
    expect(productsRepository.updateParam?.product.name).toBe(product.name);
    expect(productsRepository.updateParam?.product.price).toBe(product.price);
  });

  test('should not call productsRepository.updateById with id and data provided and return BAD_REQUEST (400) if required fields are missing', async () => {
    const { productsController, productsRepository } = mockup();

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
    expect(productsRepository.updateParam).toBeFalsy();
  });

  test('should call productsRepository.deleteById with the id provided and return OK (200)', async () => {
    const { productsController, productsRepository } = mockup();

    const id = '22';
    const httpRequest: HttpRequest = {
      params: { id },
    };

    const response = await productsController.deleteById(httpRequest);
    expect(response.status).toBe(200);
    expect(productsRepository.deleteParam?.id).toBe(id);
  });

  test('should call productsRepository.findAllCommodities() with the productId provided and return OK (200)', async () => {
    const { productsController, productsRepository } = mockup();
    const productId = '22';
    const httpRequest: HttpRequest = {
      params: { productId },
    };
    const response = await productsController.findAllCommodities(httpRequest);

    expect(productsRepository.findAllCommoditiesParam?.productId).toBe(productId);
    expect(response.status).toBe(200);
  });
});
