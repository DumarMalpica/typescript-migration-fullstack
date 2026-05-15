import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const soloAdmin = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.usuario) {
        return res.status(401).json({ state: false, msg: 'No autenticado' });
    }
    if ((req.usuario as JwtPayload).role !== 'admin') {
        return res.status(403).json({
            state: false,
            msg: 'Acceso denegado: se requiere rol administrador'
        });
    }
    next();
};
