import MatchModel from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchService {
  public static async getAllMatches(inProgress?: boolean): Promise<MatchModel[]> {
    try {
      const whereCondition: any = {};

      if (inProgress !== undefined) {
        whereCondition.inProgress = inProgress;
      }

      const matches = await MatchModel.findAll({
        where: whereCondition,
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return matches;
    } catch (error) {
      console.error('Erro no service ao buscar as partidas:', error);
      throw new Error('Erro interno ao buscar as partidas');
    }
  }
}
