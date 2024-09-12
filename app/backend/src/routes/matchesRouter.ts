import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateTokenMiddleware from '../middlewares/validadeTokenMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findByProgress(req, res));

router.patch(
  '/:id/finish',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.updateMatchToFinished(req, res),
);

router.patch(
  '/:id',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.updateMatchInProgress(req, res),
);

router.post(
  '/',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.insertNewMatch(req, res),
);

export default router;
