import { PostgreHelper } from '../../database/database';
import { Commodity } from '../../types/Commodity';
import { Product } from '../../types/Product';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';
import { WithId } from '../../types/WithId';
import { checkIdIsNumeric } from '../helpers/checkIdIsNumeric';
import { ProductsRepository } from './ProductsRepository';

export const dbConnection = PostgreHelper.getInstance();

export class PostgresProductsRepository implements ProductsRepository {
  async findAll(): Promise<WithId<Product>[]> {
    const result = await dbConnection.query('SELECT * FROM products');
    const rows = result.rows;
    const mappedProducts: WithId<Product>[] = rows.map((product) => {
      return { id: product.id, code: product.code, name: product.name, price: product.price };
    });
    return mappedProducts;
  }

  async findById(id: string): Promise<WithId<Product> | null> {
    checkIdIsNumeric(id);
    const result = await dbConnection.query(`SELECT * FROM products WHERE id = ${id}`);
    const rows = result.rows;

    if (rows.length === 0) {
      return null;
    }

    const product = rows[0];
    return { id: product.id, code: product.code, name: product.name, price: product.price };
  }

  async create(product: Product): Promise<WithId<Product>> {
    const query = {
      text: 'INSERT INTO products (code, name, price) VALUES ($1, $2, $3) RETURNING *',
      values: [product.code, product.name, product.price],
    };
    const result = await dbConnection.query(query);
    const rows = result.rows;
    const newProduct = rows[0];
    return {
      id: newProduct.id,
      code: newProduct.code,
      name: newProduct.name,
      price: newProduct.price,
    };
  }

  async updateById(id: string, product: Product): Promise<WithId<Product>> {
    checkIdIsNumeric(id);
    const { code, name, price } = product;
    const query = {
      text: `UPDATE products SET code =  $1, name = $2, price = $3 WHERE id = ${id} RETURNING *`,
      values: [code, name, price],
    };
    const result = await dbConnection.query(query);
    const rows = result.rows;
    const newProduct = rows[0];
    return {
      id: newProduct.id,
      code: newProduct.code,
      name: newProduct.name,
      price: newProduct.price,
    };
  }

  async deleteById(id: string): Promise<WithId<Product>> {
    checkIdIsNumeric(id);
    const result = await dbConnection.query(`DELETE FROM products WHERE id = ${id} RETURNING *`);
    const rows = result.rows;
    const product = rows[0];
    return { id: product.id, code: product.code, name: product.name, price: product.price };
  }

  async checkExistence(id: string): Promise<boolean> {
    const result = await this.findById(id);
    return result !== null;
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

  async addCommodity(
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
  async removeCommodity(
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
