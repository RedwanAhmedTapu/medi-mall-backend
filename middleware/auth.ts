// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
