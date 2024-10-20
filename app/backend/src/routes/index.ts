import { Router } from 'express';
import teamRouter from './teamsRouter';
import userRouter from './userRouter';
import matchesRouter from './matchesRouter';
import leaderboardRouter from './leaderboardRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
