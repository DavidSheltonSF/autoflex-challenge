import { PostgreHelper } from '../../database/database';
import { Commodity } from '../../types/Commodity';
import { ProductAndCommodity } from '../../types/ProductAndCommodity';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';
import { WithId } from '../../types/WithId';
import { ProductsCommoditiesRepository } from './ProductsCommoditiesRepository.ts';

export const dbConnection = PostgreHelper.getInstance();

export class PostgresProductsCommoditiesRepository implements ProductsCommoditiesRepository {
  async findAllProductsAndCommodities(): Promise<ProductAndCommodity[]> {
    const query = `
      SELECT p.id, p.code, p.name, p.price, pc.quantity as commodityQuantity, c.quantity as availableCommodityQuantity
      FROM products p
      INNER JOIN products_commodities pc ON p.id = pc.productid
      INNER JOIN commodities c ON c.id = pc.commodityid
       `;
    const result = await dbConnection.query(query);
    const rows = result.rows;

    const mappedResult = rows.map((row) => {
      return {
        productId: row.id,
        productName: row.name,
        productCode: row.code,
        price: row.price,
        commodityQuantity: row.commodityquantity,
        availableCommodityQuantity: row.availablecommodityquantity,
      };
    });

    return mappedResult;
  }

  async findAllCommodities(productId: string): Promise<WithId<Commodity>[]> {
    const result = await dbConnection.query(
      `SELECT c.id, c.code, c.name, pc.quantity 
      FROM products p 
      INNER JOIN products_commodities pc ON p.id = pc.productid 
      INNER JOIN commodities c ON c.id = pc.commodityid 
      WHERE p.id = ${productId}`
    );
    const rows = result.rows;
    const mappedResult = rows.map((row) => {
      return {
        id: row.id,
        code: row.code,
        name: row.name,
        quantity: row.quantity,
      };
    });

    return mappedResult;
  }

  async createCommodity(
    productCommodityRelation: ProductCommodityRelation
  ): Promise<WithId<ProductCommodityRelation>> {
    const { productId, commodityId, quantity } = productCommodityRelation;
    const query = {
      text: `INSERT INTO products_commodities(productid, commodityid, quantity) VALUES($1, $2, $3) RETURNING *`,
      values: [productId, commodityId, quantity],
    };
    const result = await dbConnection.query(query);
    const rows = result.rows;
    const productCommodity = rows[0];

    return {
      id: productCommodity.id,
      productId: productCommodity.productid,
      commodityId: productCommodity.commodityid,
      quantity: productCommodity.quantity,
    };
  }
  async deleteCommodity(
    productId: string,
    commodityId: string
  ): Promise<WithId<ProductCommodityRelation>> {
    const result = await dbConnection.query(
      `DELETE FROM products_commodities pc WHERE pc.productId = ${productId} AND pc.commodityId = ${commodityId} RETURNING *`
    );
    const rows = result.rows;
    const productCommodity = rows[0];

    return {
      id: productCommodity.id,
      productId: productCommodity.productid,
      commodityId: productCommodity.commodityid,
      quantity: productCommodity.quantity,
    };
  }
}
