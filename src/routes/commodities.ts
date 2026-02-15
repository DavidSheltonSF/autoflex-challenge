import { Router, type Request, type Response } from 'express';
import { dbConnection } from '..';

export function configCommoditiesRoutes(router: Router) {
  router.post('/commodities', async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Missing request body',
      });
    }

    const { code, name, quantity } = req.body;
    if (!code || !name || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const query = {
      text: `INSERT INTO commodities(code, name, quantity) VALUES($1, $2, $3) RETURNING *`,
      values: [code, name, quantity],
    };
    const result = await dbConnection.query(query);
    console.log(result);

    return res.status(201).json({
      data: result.rows[0],
    });
  });

  router.get('/commodities', async (req: Request, res: Response) => {
    const result = await dbConnection.query(`SELECT * FROM commodities`);
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.get('/commodities/:id', async (req: Request, res: Response) => {
    const commodityId = req.params.id;
    if (!commodityId) {
      return res.status(400).json({
        message: 'Missing commodities id',
      });
    }

    const result = await dbConnection.query(`SELECT * FROM commodities WHERE id = ${commodityId}`);
     const rows = result.rows;

     if (rows.length === 0) {
       return res.status(404).json({
         message: `Commodity with id ${commodityId} was not found`,
       });
     }
     
    return res.status(200).json({
      data: result.rows,
    });
  });

  router.put('/commodities/:id', async (req: Request, res: Response) => {
    const commodityId = req.params.id;

    if (!commodityId) {
      return res.status(400).json({
        message: 'Missing commodities id',
      });
    }

    if (!req.body) {
      return res.status(400).json({
        message: 'Missing request body',
      });
    }

    const { code, name, quantity } = req.body;
    if (!code || !name || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const query = {
      text: `UPDATE commodities SET code =  $1, name = $2, quantity = $3 WHERE id = ${commodityId} RETURNING *`,
      values: [code, name, quantity],
    };

    const result = await dbConnection.query(query);

    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: `Commodity with id ${commodityId} was not found`,
      });
    }

    return res.status(200).json({
      message: 'UPDATED',
      data: rows[0]
    });
  });

  router.delete('/commodities/:id', async (req: Request, res: Response) => {
    const commodityId = req.params.id;
    if(!commodityId){
      res.status(400).json({
        message: "Missing commodity id"
      })
    }


    const result = await dbConnection.query(`DELETE FROM commodities WHERE id = ${commodityId} RETURNING *`);
    const rows = result.rows;

    if(rows.length === 0){
      return res.status(404).json({
        message: `Commodity with id ${commodityId} was not found`
      })
    }

    return res.status(200).json({
      message: "DELETED",
      data: rows[0],
    });
  });
}
