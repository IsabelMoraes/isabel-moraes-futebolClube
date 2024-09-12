import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapsStatusHTTP';
import TeamService from '../services/TeamsService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.findAll();
    res.status(200).json(ServiceResponse.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.teamService.findById(Number(id));
    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }
    res.status(200).json(ServiceResponse.data);
  }
}
