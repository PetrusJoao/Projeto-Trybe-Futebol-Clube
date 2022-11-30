import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado!' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log(decoded);

    req.body.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
