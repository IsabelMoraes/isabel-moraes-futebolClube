import { ITeams } from '../Interfaces/teams/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    if (team == null) return null;
    return team;
  }
}
