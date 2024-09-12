import { Request, Response, NextFunction } from 'express';
import validateToken from '../auth/validateToken';

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedUser = validateToken(token);
    req.body = { ...req.body, user: decodedUser };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateTokenMiddleware;
