import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const checkToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export default checkToken;
