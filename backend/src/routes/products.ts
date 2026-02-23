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
  router.get(
    '/products/:id/commodities',
    expressHttpAdapter(productsController.findAllCommodities)
  );
  router.post('/products/:id/commodities', expressHttpAdapter(productsController.addCommodity));
  router.delete(
    '/products/:productId/commodities/:commodityId',
    expressHttpAdapter(productsController.removeCommodity)
  );

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

  
}
