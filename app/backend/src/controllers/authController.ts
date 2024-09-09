import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';

const SECRET_KEY = 'your_secret_key';

const validateFields = (email: string, password: string) => {
  if (!email || !password) {
    console.log('Missing fields:', { email, password });
    return { valid: false, message: 'All fields must be filled' };
  }
  return { valid: true };
};

const generateToken = (user: User) => {
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  console.log('Generated token:', token);
  return token;
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { valid, message } = validateFields(email, password);
  if (!valid) return res.status(400).json({ message });

  try {
    const user = await User.findOne({ where: { email } });
    console.log('User from DB:', user);

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default login;
