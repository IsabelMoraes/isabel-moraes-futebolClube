import { Router } from 'express';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

matchRouter.get('/', (req, res) => MatchController.getAllMatches(req, res));

export default matchRouter;
