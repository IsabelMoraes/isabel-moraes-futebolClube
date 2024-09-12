import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController
  .getHomeAwayGames(req, res, ['home', 'away']));

router.get('/away', (req: Request, res: Response) => leaderboardController
  .getHomeAwayGames(req, res, ['away', 'home']));

router.get('/home', (req: Request, res: Response) => leaderboardController
  .getLeaderboard(req, res));

export default router;
