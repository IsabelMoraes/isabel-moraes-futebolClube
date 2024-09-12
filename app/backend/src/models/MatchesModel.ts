import SequelizeTeam from '../database/models/SequelizeTeams';
import { IMatches, INewMatchData } from '../Interfaces/matches/IMatches';
import { IMachesModel } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MachesModel implements IMachesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const match = await this.model.findByPk(id);
    if (id == null) return null;
    return match;
  }

  async findFinishedMatches(): Promise<IMatches[]> {
    const finishedMatches = await this.model.findAll({
      where: { inProgress: false },
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return finishedMatches;
  }

  async findMatchesInProgress(): Promise<IMatches[]> {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: true },
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matchesInProgress;
  }

  async updateMatchToFinished(id: IMatches['id']) {
    const affectedRows = await this.model.update({ inProgress: false }, { where: { id } });
    return affectedRows;
  }

  async updateMatchInProgress(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['homeTeamGoals'],
  ) {
    const affectedRows = await this.model
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return affectedRows;
  }

  async insertNewMatch(body: INewMatchData) {
    const newMatch = await this.model.create({ ...body, inProgress: true });
    return newMatch;
  }
}
