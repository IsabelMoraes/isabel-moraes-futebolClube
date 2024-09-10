import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';

const SECRET_KEY = 'your_secret_key';
const INVALID_EMAIL_OR_PASSWORD_MESSAGE = 'Invalid email or password';
const ALL_FIELDS_MUST_BE_FILLED_MESSAGE = 'All fields must be filled';

const validateEmailFormat = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateFields = (email: string, password: string) => {
  if (!validateEmailFormat(email)) {
    return { valid: false, message: INVALID_EMAIL_OR_PASSWORD_MESSAGE };
  }
  if (password.length < 6) {
    return { valid: false, message: INVALID_EMAIL_OR_PASSWORD_MESSAGE };
  }
  return { valid: true };
};

const generateToken = (user: User) =>
  jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: ALL_FIELDS_MUST_BE_FILLED_MESSAGE });
  }

  const { valid, message } = validateFields(email, password);
  if (!valid) return res.status(401).json({ message });
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: INVALID_EMAIL_OR_PASSWORD_MESSAGE });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: INVALID_EMAIL_OR_PASSWORD_MESSAGE });

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default login;
