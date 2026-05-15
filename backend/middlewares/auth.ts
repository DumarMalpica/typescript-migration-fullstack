import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    usuario?: string | JwtPayload;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ state: false, msg: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof payload !== 'string' && payload.exp && Date.now() / 1000 > payload.exp) {
      return res.status(401).json({ state: false, msg: 'Token expirado' });
    }

    req.usuario = payload;
    next();

  } catch (error) {
    return res.status(401).json({ state: false, msg: 'Token inválido: ' + (error as Error).message });
  }
};
