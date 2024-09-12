import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class TeamController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const ServiceResponse = await this.matchesService.findAll();
    res.status(200).json(ServiceResponse.data);
  }

  public async findByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'false') {
      const ServiceResponse = await this.matchesService.findFinishedMatches();
      res.status(200).json(ServiceResponse.data);
    }
    if (inProgress === 'true') {
      const ServiceResponse = await this.matchesService.findMatchesInProgress();
      res.status(200).json(ServiceResponse.data);
    }
    const ServiceResponse = await this.matchesService.findAll();
    res.status(200).json(ServiceResponse.data);
  }

  public async updateMatchToFinished(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.matchesService.updateMatchToFinished(Number(id));
    res.status(200).json(ServiceResponse.data);
  }

  public async updateMatchInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const ServiceResponse = await this.matchesService
      .updateMatchInProgress(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json(ServiceResponse.data);
  }

  public async insertNewMatch(req: Request, res: Response) {
    const { status, data } = await this.matchesService.insertNewMatch(req.body);
    return res.status(status).json(data);
  }
}
