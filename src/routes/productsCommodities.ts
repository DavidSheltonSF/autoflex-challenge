import { Router, type Request, type Response } from 'express';
import { dbConnection } from '..';

export function configproductsCommoditiesRoutes(router: Router) {
  router.post('/productsCommodities', async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Missing request body',
      });
    }

    const { name, productId, commodityId, quantity } = req.body;
    if (!name ||!productId || !commodityId || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const query = {
      text: `INSERT INTO products_commodities(name, productId, commodityId, quantity) VALUES($1, $2, $3, $4) RETURNING *`,
      values: [name, productId, commodityId, quantity],
    };
    const result = await dbConnection.query(query);
    console.log(result);

    return res.status(201).json({
      data: result.rows[0],
    });
  });

  router.get('/productsCommodities', async (req: Request, res: Response) => {
    const result = await dbConnection.query(`SELECT * FROM products_commodities`);
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.get('/productsCommodities/:id', async (req: Request, res: Response) => {
    const productCommodityId = req.params.id;
    if (!productCommodityId) {
      return res.status(400).json({
        message: 'Missing productsCommodities id',
      });
    }

    const result = await dbConnection.query(
      `SELECT * FROM productsCommodities WHERE id = ${productCommodityId}`
    );
     const rows = result.rows;

     if (rows.length === 0) {
       return res.status(404).json({
         message: `Commodity with id ${productCommodityId} was not found`,
       });
     }
     
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.put('/productsCommodities/:id', async (req: Request, res: Response) => {
    const productCommodityId = req.params.id;

    if (!productCommodityId) {
      return res.status(400).json({
        message: 'Missing productsCommodities id',
      });
    }

    if (!req.body) {
      return res.status(400).json({
        message: 'Missing request body',
      });
    }

    const { name, productId, commodityId, quantity } = req.body;
    if (!name ||  !productId || !commodityId || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const query = {
      text: `UPDATE productsCommodities SET name = $1 productId =  $2, commodityId = $3, quantity = $4 WHERE id = ${productCommodityId} RETURNING *`,
      values: [name, productId, commodityId, quantity],
    };

    const result = await dbConnection.query(query);

    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: `product_commodity relation with id ${productCommodityId} was not found`,
      });
    }

    return res.status(200).json({
      message: 'UPDATED',
      data: rows[0]
    });
  });

  router.delete('/productsCommodities/:id', async (req: Request, res: Response) => {
    const productCommodityId = req.params.id;
    if (!productCommodityId) {
      res.status(400).json({
        message: 'Missing commodity id',
      });
    }


    const result = await dbConnection.query(
      `DELETE FROM productsCommodities WHERE id = ${productCommodityId} RETURNING *`
    );
    const rows = result.rows;

    if(rows.length === 0){
      return res.status(404).json({
        message: `Commodity with id ${productCommodityId} was not found`,
      });
    }

    return res.status(200).json({
      message: "DELETED",
      data: rows[0],
    });
  });
}
