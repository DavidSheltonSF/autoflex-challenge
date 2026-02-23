import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { PostgresProductsCommoditiesRepository } from './PostgresProductsCommoditiesRepository';
import { PostgreHelper } from '../../database/database';
import format from 'pg-format';

export const dbConnection = PostgreHelper.getInstance();

describe('Testing PostgresProductsCommoditiesRepository', () => {
  beforeAll(async () => {
    await dbConnection.connect();
  });

  beforeEach(async () => {
    await dbConnection.query(`DELETE FROM products`);
    await dbConnection.query(`DELETE FROM products_commodities`);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  function mockup() {
    const productsCommoditiesRepository = new PostgresProductsCommoditiesRepository();

    return {
      productsCommoditiesRepository,
    };
  }

  test('should find all products AND commodities', async () => {
    const { productsCommoditiesRepository } = mockup();

    const newProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const newCommodity = {
      code: 'com3214',
      name: 'barra de ferro',
      quantity: 50,
    };

    const commodityNecessaryQuantity = 20

    const insertQueries = {
      product: {
        text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
        values: [newProduct.code, newProduct.name, newProduct.price],
      },
      commodity: {
        text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING id',
        values: [newCommodity.code, newCommodity.name, newCommodity.quantity],
      },
    };

    const insertProductResult = await dbConnection.query(insertQueries.product);
    const insertCommodityResult = await dbConnection.query(insertQueries.commodity);

    const productId = insertProductResult.rows[0].id;
    const commodityId = insertCommodityResult.rows[0].id;

    const insertProductCommodityQuery = {
      text: 'INSERT INTO products_commodities (productId, commodityId, quantity) VALUES ($1, $2, $3) RETURNING *',
      values: [productId, commodityId, commodityNecessaryQuantity],
    };

    await dbConnection.query(insertProductCommodityQuery);

    const findAllProductCommoditiesResult =
      await productsCommoditiesRepository.findAllProductsAndCommodities();
    const productAndCommodity = findAllProductCommoditiesResult[0];

    expect(findAllProductCommoditiesResult.length).toBe(1);
    expect(productAndCommodity?.productId).toBe(productId);
    expect(productAndCommodity?.productCode).toBe(newProduct.code);
    expect(productAndCommodity?.productName).toBe(newProduct.name);
    expect(productAndCommodity?.price).toBe(newProduct.price);
    expect(productAndCommodity?.commodityQuantity).toBe(commodityNecessaryQuantity);
    expect(productAndCommodity?.availableCommodityQuantity).toBe(newCommodity.quantity);

  });

  test('should find all product commodities', async () => {
    const { productsCommoditiesRepository } = mockup();

    const newProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const newCommodity = {
      code: 'com3214',
      name: 'barra de ferro',
      quantity: 50,
    };

    const insertQueries = {
      product: {
        text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
        values: [newProduct.code, newProduct.name, newProduct.price],
      },
      commodity: {
        text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING id',
        values: [newCommodity.code, newCommodity.name, newCommodity.quantity],
      },
    };

    const insertProductResult = await dbConnection.query(insertQueries.product);
    const insertCommodityResult = await dbConnection.query(insertQueries.commodity);

    const productId = insertProductResult.rows[0].id;
    const commodityId = insertCommodityResult.rows[0].id;

    const insertProductCommodityQuery = {
      text: 'INSERT INTO products_commodities (productId, commodityId, quantity) VALUES ($1, $2, $3) RETURNING *',
      values: [productId, commodityId, newCommodity.quantity],
    };

    await dbConnection.query(insertProductCommodityQuery);

    const findAllProductCommoditiesResult = await productsCommoditiesRepository.findAllCommodities(
      productId
    );
    const productCommodity = findAllProductCommoditiesResult[0];

    expect(findAllProductCommoditiesResult.length).toBe(1);
    expect(productCommodity?.code).toBe(newCommodity.code);
    expect(productCommodity?.name).toBe(newCommodity.name);
    expect(productCommodity?.quantity).toBe(newCommodity.quantity);
  });

  test('should create one product commodity', async () => {
    const { productsCommoditiesRepository } = mockup();

    const newProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const newCommodity = {
      code: 'com3214',
      name: 'barra de ferro',
      quantity: 50,
    };

    const insertProductQuery = {
      text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
      values: [newProduct.code, newProduct.name, newProduct.price],
    };
    const insertCommodityQuery = {
      text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING id',
      values: [newCommodity.code, newCommodity.name, newCommodity.quantity],
    };

    const insertProductResult = await dbConnection.query(insertProductQuery);
    const insertCommodityResult = await dbConnection.query(insertCommodityQuery);

    const productId = insertProductResult.rows[0].id;
    const commodityId = insertCommodityResult.rows[0].id;

    const newProductCommodity = { productId, commodityId, quantity: 50 };

    const addCommodityResult = await productsCommoditiesRepository.createCommodity(
      newProductCommodity
    );

    expect(addCommodityResult.productId).toBe(productId);
    expect(addCommodityResult.commodityId).toBe(commodityId);
    expect(addCommodityResult.quantity).toBe(newCommodity.quantity);
  });

  test('should delete one commodity from a product', async () => {
    const { productsCommoditiesRepository } = mockup();

    const newProduct = {
      code: 'prod1234',
      name: 'cadeira de ferro',
      price: 500,
    };

    const newCommodity = {
      code: 'com3214',
      name: 'barra de ferro',
      quantity: 50,
    };

    const insertQueries = {
      product: {
        text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
        values: [newProduct.code, newProduct.name, newProduct.price],
      },
      commodity: {
        text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING id',
        values: [newCommodity.code, newCommodity.name, newCommodity.quantity],
      },
    };

    const insertProductResult = await dbConnection.query(insertQueries.product);
    const insertCommodityResult = await dbConnection.query(insertQueries.commodity);

    const productId = insertProductResult.rows[0].id;
    const commodityId = insertCommodityResult.rows[0].id;

    const insertProductCommodityQuery = {
      text: 'INSERT INTO products_commodities (productId, commodityId, quantity) VALUES ($1, $2, $3) RETURNING *',
      values: [productId, commodityId, newCommodity.quantity],
    };

    const insertProductCommodityResult = await dbConnection.query(insertProductCommodityQuery);
    const productCommodityId = insertProductCommodityResult.rows[0].id;

    const removeProductCommodityResult = await productsCommoditiesRepository.deleteCommodity(
      productId,
      commodityId
    );

    const result = await dbConnection.query(
      `SELECT * FROM products_commodities WHERE ID = ${productCommodityId}`
    );

    expect(result.rows.length).toBe(0);
    expect(removeProductCommodityResult.productId).toBe(productId);
    expect(removeProductCommodityResult.commodityId).toBe(commodityId);
    expect(removeProductCommodityResult.quantity).toBe(newCommodity.quantity);
  });
});
