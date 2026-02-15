import { Router, type Request, type Response } from 'express';
import { dbConnection } from '..';

export function configProductsRoutes(router: Router) {
  router.post('/products', async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Missing request body',
      });
    }

    const { code, name, price } = req.body;
    if (!code || !name || !price) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const query = {
      text: `INSERT INTO products(code, name, price) VALUES($1, $2, $3) RETURNING *`,
      values: [code, name, price],
    };
    const result = await dbConnection.query(query);
    console.log(result);

    return res.status(201).json({
      data: result.rows[0],
    });
  });

  router.get('/products', async (req: Request, res: Response) => {
    const result = await dbConnection.query(`SELECT * FROM products`);
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.get('/products/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        message: 'Missing products id',
      });
    }

    const result = await dbConnection.query(`SELECT * FROM products WHERE id = ${productId}`);
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: `Product with id ${productId} was not found`,
      });
    }

    return res.status(200).json({
      data: rows[0],
    });
  });

  router.put('/products/:id', async (req: Request, res: Response) => {
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

    const { code, name, price } = req.body;
    if (!code || !name || !price) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const query = {
      text: `UPDATE products SET code =  $1, name = $2, price = $3 WHERE id = ${productId} RETURNING *`,
      values: [code, name, price],
    };

    const result = await dbConnection.query(query);
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: `Product with id ${productId} was not found`,
      });
    }

    return res.status(200).json({
      message: 'UPDATED',
      data: rows[0],
    });
  });

  router.delete('/products/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      res.status(400).json({
        message: 'Missing product id',
      });
    }

    const result = await dbConnection.query(
      `DELETE FROM products WHERE id = ${productId} RETURNING *`
    );
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: `Product with id ${productId} was not found`,
      });
    }
    return res.status(200).json({
      message: 'DELETED',
      data: rows[0],
    });
  });
}
