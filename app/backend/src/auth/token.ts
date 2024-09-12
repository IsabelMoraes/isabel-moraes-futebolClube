import * as jwt from 'jsonwebtoken';
import { IUsers } from '../Interfaces/users/IUsers';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (user: IUsers): string => {
  const payload = {
    userId: user.id,
    name: user.username,
    role: user.role,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: '1h', algorithm: 'HS256' });

  return token;
};

export default createToken;
