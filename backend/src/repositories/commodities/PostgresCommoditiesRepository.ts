import { PostgreHelper } from '../../database/database';
import { Commodity } from '../../types/Commodity';
import { WithId } from '../../types/WithId';
import { CommoditiesRepository } from './CommoditiesRepository';

export const dbConnection = PostgreHelper.getInstance();

export class PostgresCommoditiesRepository implements CommoditiesRepository {
  async findAll(): Promise<WithId<Commodity>[]> {
    const result = await dbConnection.query('SELECT * FROM commodities');
    const rows = result.rows;
    const mappedCommodities: WithId<Commodity>[] = rows.map((commodity) => {
      return { id: commodity.id, code: commodity.code, name: commodity.name, quantity: commodity.quantity };
    });
    return mappedCommodities;
  }

  async findById(id: string): Promise<WithId<Commodity> | null> {
    const result = await dbConnection.query(`SELECT * FROM commodities WHERE id = ${id}`);
    const rows = result.rows;

    if (rows.length === 0) {
      return null
    }

    const commodity = rows[0];
    return { id: commodity.id, code: commodity.code, name: commodity.name, quantity: commodity.quantity };
  }

  async create(commodity: Commodity): Promise<WithId<Commodity>> {
    const query = {
      text: 'INSERT INTO commodities (code, name, quantity) VALUES ($1, $2, $3) RETURNING *',
      values: [commodity.code, commodity.name, commodity.quantity],
    };
    const result = await dbConnection.query(query);
    const rows = result.rows;
    const newCommodity = rows[0];
    return {
      id: newCommodity.id,
      code: newCommodity.code,
      name: newCommodity.name,
      quantity: newCommodity.quantity,
    };
  }

  async updateById(id: string, commodity: Commodity): Promise<WithId<Commodity>> {
    const { code, name, quantity } = commodity;
    const query = {
      text: `UPDATE commodities SET code =  $1, name = $2, quantity = $3 WHERE id = ${id} RETURNING *`,
      values: [code, name, quantity],
    };
    const result = await dbConnection.query(query);
    const rows = result.rows;
    const newCommodity = rows[0];
    return {
      id: newCommodity.id,
      code: newCommodity.code,
      name: newCommodity.name,
      quantity: newCommodity.quantity,
    };
  }

  async deleteById(id: string): Promise<WithId<Commodity>> {
    const result = await dbConnection.query(`DELETE FROM commodities WHERE id = ${id} RETURNING *`);
    const rows = result.rows;
    const commodity = rows[0];
    return { id: commodity.id, code: commodity.code, name: commodity.name, quantity: commodity.quantity };
  }
}
