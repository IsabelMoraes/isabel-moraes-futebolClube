import { Request, Response, NextFunction } from 'express';

const validadeLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const validEmail = regex.test(email);
  const validPassword = password.length >= 6;

  if (!validPassword || !validEmail) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default validadeLogin;
