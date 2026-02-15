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
      text: `INSERT INTO product(code, name, price) VALUES($1, $2, $3) RETURNING *`,
      values: [code, name, price],
    };
    const result = await dbConnection.query(query);
    console.log(result);

    return res.status(201).json({
      data: result.rows[0],
    });
  });

  router.get('/products', async (req: Request, res: Response) => {
    const result = await dbConnection.query(`SELECT * FROM product`);
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.put('/products/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        message: 'Missing product id',
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
      text: `UPDATE product SET code =  $1, name = $2, price = $3 WHERE id = ${productId}`,
      values: [code, name, price],
    };

    await dbConnection.query(query);

    return res.status(200).json({
      message: 'updated',
    });
  });

  router.delete('/products/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    if(!productId){
      res.status(400).json({
        message: "Missing product id"
      })
    }


    const result = await dbConnection.query(`DELETE FROM product WHERE id = ${productId} RETURNING *`);
    return res.status(200).json({
      message: "DELETED",
      data: result.rows,
    });
  });
}
