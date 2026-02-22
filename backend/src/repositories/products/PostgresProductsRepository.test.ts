import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { PostgresProductsRepository } from './PostgresProductsRepository';
import { PostgreHelper } from '../../database/database';
import format from 'pg-format';

export const dbConnection = PostgreHelper.getInstance();

describe('Testing PostgresProductRepository', () => {
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
    const productRepository = new PostgresProductsRepository();

    return {
      productRepository,
    };
  }

  test('Should find all products', async () => {
    const { productRepository } = mockup();
    const values = [
      ['5FFA5S4', 'cadeira', 25],
      ['5F885S4', 'mesa', 250],
    ];
    const insertResult = await dbConnection.query(
      format('INSERT INTO products (code, name, price) VALUES %L RETURNING *', values)
    );
    const result = await productRepository.findAll();
    expect(result[0]?.id).toBe(insertResult.rows[0].id);
    expect(result[0]?.code).toBe(insertResult.rows[0].code);
    expect(result[0]?.name).toBe(insertResult.rows[0].name);
    expect(result[0]?.price).toBe(insertResult.rows[0].price);
  });

  test('Should find one product', async () => {
    const { productRepository } = mockup();
    const query = {
      text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING *',
      values: ['5FFA5S4', 'cadeira', 25],
    };
    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;

    const result = await productRepository.findById(id);

    expect(result?.id).toBe(insertResult.rows[0].id);
    expect(result?.code).toBe(insertResult.rows[0].code);
    expect(result?.name).toBe(insertResult.rows[0].name);
    expect(result?.price).toBe(insertResult.rows[0].price);
  });

  test('Should create one product', async () => {
    const { productRepository } = mockup();

    const newProduct = {
      code: '5154gga',
      name: 'cadeira de ferro',
      price: 500,
    };
    const result = await productRepository.create(newProduct);

    expect(result.code).toBe(newProduct.code);
    expect(result?.name).toBe(newProduct.name);
    expect(result?.price).toBe(newProduct.price);
  });

  test('Should update one product', async () => {
    const { productRepository } = mockup();

    const newProduct = {
      code: '5154gga',
      name: 'cadeira de ferro',
      price: 500,
    };

    const updatedProduct = {
      code: '5154gga',
      name: 'cadeira de ferro-updated',
      price: 500,
    };

    const query = {
      text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
      values: [newProduct.code, newProduct.name, newProduct.price],
    };

    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;

    await productRepository.updateById(id, updatedProduct);

    const result = await dbConnection.query(`SELECT * FROM products WHERE id = ${id}`);
    const rows = result.rows;
    const product = rows[0];

    expect(product.code).toBe(updatedProduct.code);
    expect(product?.name).toBe(updatedProduct.name);
    expect(product?.price).toBe(updatedProduct.price);
  });

  test('Should delete one product', async () => {
    const { productRepository } = mockup();

    const newProduct = {
      code: '5154gga',
      name: 'cadeira de ferro',
      price: 500,
    };

    const query = {
      text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
      values: [newProduct.code, newProduct.name, newProduct.price],
    };

    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;
    await productRepository.deleteById(id);

    const result = await dbConnection.query(`SELECT * FROM products WHERE id = ${id}`);

    expect(result.rows.length).toBe(0);
  });

  test('should return true if the product exist and false if it does not', async () => {
    const { productRepository } = mockup();

    const newProduct = {
      code: '5154gga',
      name: 'cadeira de ferro',
      price: 500,
    };

    const query = {
      text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING id',
      values: [newProduct.code, newProduct.name, newProduct.price],
    };

    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;

    const existingProduct = await productRepository.checkExistence(id);
    const nonExistingProduct = await productRepository.checkExistence('2');

    expect(existingProduct).toBeTruthy();
    expect(nonExistingProduct).toBeFalsy();
  });
});
