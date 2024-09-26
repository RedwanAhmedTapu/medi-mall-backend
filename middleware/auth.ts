// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {UserPayload} from "../types/express/index"
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(authHeader,"hea")

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    // We know that decodedToken will be of type UserPayload if verified successfully
    req.user = decodedToken as UserPayload;
    next();
  });
};
