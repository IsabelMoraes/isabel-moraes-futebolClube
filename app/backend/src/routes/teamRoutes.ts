import { Router } from 'express';
import teamController from '../controllers/teamController';

const teamRouter = Router();

teamRouter.use('/', teamController);

export default teamRouter;
