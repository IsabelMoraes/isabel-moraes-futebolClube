import { Router, Request, Response } from 'express';
import validateToken from '../middlewares/validateToken';
import authController from '../controllers/authController';

interface CustomRequest extends Request {
  user?: { id: number; role: string };
}

const authRouter = Router();

authRouter.post('/login', authController);

authRouter.get('/login/role', validateToken, (req: CustomRequest, res: Response) => {
  if (req.user) {
    const { role } = req.user;
    return res.status(200).json({ role });
  }
  return res.status(400).json({ message: 'User not found' });
});

export default authRouter;
