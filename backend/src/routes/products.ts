import { Router, type Request, type Response } from 'express';
import { dbConnection } from '..';
import { getViableProducts } from '../utils/getViableProducts';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { makeProductsController } from '../controllers/factories/makeProductsController';

const productsController = makeProductsController();

export function configProductsRoutes(router: Router) {
  router.post('/products', expressHttpAdapter(productsController.create));
  router.get('/products', expressHttpAdapter(productsController.findAll));
  router.get('/products/:id', expressHttpAdapter(productsController.findById));
  router.put('/products/:id', expressHttpAdapter(productsController.updateById));
  router.delete('/products/:id', expressHttpAdapter(productsController.deleteById));

  router.get('/availableProducts', async (req: Request, res: Response) => {
    const query = `
  SELECT p.id, p.name, p.price, pc.quantity as commodityQuantity, c.name as commodityName, c.quantity as availableCommodityQuantity
  FROM products p
  INNER JOIN products_commodities pc ON p.id = pc.productid
  INNER JOIN commodities c ON c.id = pc.commodityid
   `;
    const result = await dbConnection.query(query);
    const rows = result.rows;
    let groupedRowsByProductIdObj: Record<string, any[]> = {};
    rows.forEach((row) => {
      if (groupedRowsByProductIdObj[row.id] === undefined) {
        groupedRowsByProductIdObj[row.id] = [];
      }
      groupedRowsByProductIdObj[row.id]?.push(row);
    });

    const groupedRowsByProductId = Object.values(groupedRowsByProductIdObj);

    const viableProducts = getViableProducts(groupedRowsByProductId);

    return res.status(200).json({
      data: viableProducts,
    });
  });

  router.post('/products/:id/commodities', async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        message: 'Missing products id',
      });
    }

    if (!req.body) {
      return res.status(400).json({
        message: 'Missing request body',
      });
    }

    const { commodityId, quantity } = req.body;
    if (!commodityId || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const productQuery = await dbConnection.query(
      `SELECT name FROM products WHERE id = ${productId}`
    );
    if (productQuery.rows.length === 0) {
      return res.status(404).json({
        message: `Product with id ${productId} was not found`,
      });
    }

    const query = {
      text: `INSERT INTO products_commodities(productid, commodityid, quantity) VALUES($1, $2, $3) RETURNING *`,
      values: [productId, commodityId, quantity],
    };
    const result = await dbConnection.query(query);

    return res.status(201).json({
      data: result.rows[0],
    });
  });

  router.get('/products/:id/commodities', async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        message: 'Missing products id',
      });
    }
    const result = await dbConnection.query(
      `SELECT c.id, c.code, c.name, pc.quantity FROM products p INNER JOIN products_commodities pc ON p.id = pc.productid INNER JOIN commodities c ON c.id = pc.commodityid WHERE p.id = ${productId}`
    );
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.delete(
    '/products/:productId/commodities/:commodityId',
    async (req: Request, res: Response) => {
      const productId = req.params.productId;
      const commodityId = req.params.commodityId;

      if (!productId) {
        return res.status(400).json({
          message: 'Missing products id',
        });
      }
      if (!commodityId) {
        return res.status(400).json({
          message: 'Missing commodity id',
        });
      }

      const productQuery = await dbConnection.query(
        `SELECT name FROM products WHERE id = ${productId}`
      );
      if (productQuery.rows.length === 0) {
        return res.status(404).json({
          message: `Product with id ${productId} was not found`,
        });
      }

      const productCommodity = await dbConnection.query(
        `SELECT id FROM products_commodities pc WHERE  pc.productid = ${productId} AND pc.commodityid = ${commodityId}`
      );
      if (productCommodity.rows.length === 0) {
        return res.status(404).json({
          message: `Product commodity was not was not found`,
        });
      }

      const result = await dbConnection.query(
        `DELETE FROM products_commodities pc WHERE pc.productId = ${productId} AND pc.commodityId = ${commodityId} RETURNING *`
      );
      const rows = result.rows;

      if (rows.length === 0) {
        return res.status(500).json({
          message: `Something went wrong and nothing was deleted`,
        });
      }

      return res.status(200).json({
        message: 'DELETED',
      });
    }
  );
}
