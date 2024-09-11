import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const secret = 'your_secret_key';
export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers.authorization;
  console.log(tokenHeader);
  if (!tokenHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = tokenHeader.replace('Bearer ', '');
  try {
    const decoded = verify(token, secret) as { id: number; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification error:', error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
