import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { PostgresCommoditiesRepository } from './PostgresCommoditiesRepository';
import { PostgreHelper } from '../../database/database';
import format from 'pg-format';

export const dbConnection = PostgreHelper.getInstance();

describe('Testing PostgresCommodityRepository', () => {
  beforeAll(async () => {
    await dbConnection.connect();
  });

  beforeEach(async () => {
    await dbConnection.query(`DELETE FROM commodities`);
    await dbConnection.query(`DELETE FROM products_commodities`);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  function mockup() {
    const commodityRepository = new PostgresCommoditiesRepository();

    return {
      commodityRepository,
    };
  }

  test('Should find all commodities', async () => {
    const { commodityRepository } = mockup();
    const values = [
      ['5FFA5S4', 'cadeira', 25],
      ['5F885S4', 'mesa', 250],
    ];
    const insertResult = await dbConnection.query(
      format('INSERT INTO commodities (code, name, quantity) VALUES %L RETURNING *', values)
    );
    const result = await commodityRepository.findAll();
    expect(result[0]?.id).toBe(insertResult.rows[0].id);
    expect(result[0]?.code).toBe(insertResult.rows[0].code);
    expect(result[0]?.name).toBe(insertResult.rows[0].name);
    expect(result[0]?.quantity).toBe(insertResult.rows[0].quantity);
  });

  test('Should find one commodity', async () => {
    const { commodityRepository } = mockup();
    const query = {
      text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING *',
      values: ['5FFA5S4', 'cadeira', 25],
    };
    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;

    const result = await commodityRepository.findById(id);

    expect(result?.id).toBe(insertResult.rows[0].id);
    expect(result?.code).toBe(insertResult.rows[0].code);
    expect(result?.name).toBe(insertResult.rows[0].name);
    expect(result?.quantity).toBe(insertResult.rows[0].quantity);
  });

  test('Should create one commodity', async () => {
    const { commodityRepository } = mockup();

    const newCommodity = {
      code: '5154gga',
      name: 'cadeira de ferro',
      quantity: 500,
    };
    const result = await commodityRepository.create(newCommodity);

    expect(result.code).toBe(newCommodity.code);
    expect(result?.name).toBe(newCommodity.name);
    expect(result?.quantity).toBe(newCommodity.quantity);
  });

  test('Should update one commodity', async () => {
    const { commodityRepository } = mockup();

    const newCommodity = {
      code: '5154gga',
      name: 'cadeira de ferro',
      quantity: 500,
    };

    const updatedCommodity = {
      code: '5154gga',
      name: 'cadeira de ferro-updated',
      quantity: 500,
    };

    const query = {
      text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING id',
      values: [newCommodity.code, newCommodity.name, newCommodity.quantity],
    };

    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;

    await commodityRepository.updateById(id, updatedCommodity);

    const result = await dbConnection.query(`SELECT * FROM commodities WHERE id = ${id}`);
    const rows = result.rows;
    const commodity = rows[0];

    expect(commodity.code).toBe(updatedCommodity.code);
    expect(commodity?.name).toBe(updatedCommodity.name);
    expect(commodity?.quantity).toBe(updatedCommodity.quantity);
  });

  test('Should delete one commodity', async () => {
    const { commodityRepository } = mockup();

    const newCommodity = {
      code: '5154gga',
      name: 'cadeira de ferro',
      quantity: 500,
    };

    const query = {
      text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING id',
      values: [newCommodity.code, newCommodity.name, newCommodity.quantity],
    };

    const insertResult = await dbConnection.query(query);
    const id = insertResult.rows[0].id;
    await commodityRepository.deleteById(id);

    const result = await dbConnection.query(`SELECT * FROM commodities WHERE id = ${id}`);

    expect(result.rows.length).toBe(0);
  });
});
