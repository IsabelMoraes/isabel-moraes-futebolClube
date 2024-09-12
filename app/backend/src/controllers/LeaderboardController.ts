import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  async getHomeAwayGames(
    _req: Request,
    res: Response,
    definition: ['home', 'away'] | ['away', 'home'],
  ) {
    const { data, status } = await this.leaderBoardService.getHomeAwayGames(definition);
    return res.status(status).json(data);
  }

  async getLeaderboard(_req: Request, res: Response) {
    const { data, status } = await this.leaderBoardService.getLeaderboard();
    return res.status(status).json(data);
  }
}
