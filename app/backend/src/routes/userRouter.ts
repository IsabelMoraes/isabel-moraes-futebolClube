import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import validadeLogin from '../middlewares/validateLoginMiddleware';
import validateTokenMiddleware from '../middlewares/validadeTokenMiddleware';

const userController = new UserController();

const router = Router();

router.post('/', validadeLogin, (req: Request, res: Response) =>
  userController.userLogin(req, res));

router.get('/role', validateTokenMiddleware, (req: Request, res: Response) =>
  UserController.getUserRole(req, res));

export default router;
