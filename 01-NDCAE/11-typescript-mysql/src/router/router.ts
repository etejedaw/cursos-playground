import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/customer', (req: Request, res: Response) => {
    const query = `
    SELECT *
    FROM Customer`;
    MySQL.execQuery(query, (err: any, customerDB: Object[]) => {
        if(err) return res.status(400).json({
            ok: false,
            err
        });
        return res.json({
            ok: true,
            customerDB
        });
    });
});

router.get('/customer/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    id = MySQL.instance.cnn.escape(id);
    const query = `
    SELECT *
    FROM Customer
    WHERE idCustomer=${id}`;
    MySQL.execQuery(query, (err: any, customerDB: Object[]) => {
        if(err) return res.status(400).json({
            ok: false,
            err
        });
        return res.json({
            ok: true,
            customerDB
        });
    });
});

export default router;