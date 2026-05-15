import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

interface UsuarioLocal {
  id: number;
  username?: string;
  password?: string;
  role: string;
}

const getUsuarios = (): UsuarioLocal[] => [
  {
    id: 1,
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASS,
    role: 'admin'
  },
  {
    id: 2,
    username: process.env.USER_USER,
    password: process.env.USER_PASS,
    role: 'user'
  }
];

export const login = (req: Request, res: Response): any => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ state: false, msg: 'Usuario y contraseña requeridos' });
    }

    const usuario = getUsuarios().find(u => u.username === username && u.password === password);

    if (!usuario) {
      return res.status(401).json({ state: false, msg: 'Credenciales inválidas' });
    }

    const payload = {
      sub: usuario.id,
      username: usuario.username,
      role: usuario.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

    return res.status(200).json({
      state: true,
      msg: 'Login exitoso',
      token
    });

  } catch (error) {
    return res.status(500).json({ state: false, msg: (error as Error).message });
  }
};
