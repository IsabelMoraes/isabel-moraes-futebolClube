import ILeaderboard from '../Interfaces/ILeaderboard';
import { IMatches } from '../Interfaces/matches/IMatches';
import leaderboardUtils from '../utils/leaderboardUtils';
import TeamModel from '../models/TeamsModel';
import MachesModel from '../models/MatchesModel';

export default class LeaderBoardService {
  constructor(
    private teamsModel = new TeamModel(),
    private matchesModels = new MachesModel(),
  ) {}

  async getHomeAwayGames(location: ['home', 'away'] | ['away', 'home']) {
    const matches = await this.matchesModels.findFinishedMatches();
    const teams = await this.teamsModel.findAll();
    const homeAwayLeaderboards = leaderboardUtils
      .leaderboards(matches as IMatches[], teams, location as ['home', 'away']);
    return { data: leaderboardUtils.sortLeaderboards(homeAwayLeaderboards), status: 200 };
  }

  async getLeaderboard() {
    const home = await this.getHomeAwayGames(['home', 'away']);
    const away = await this.getHomeAwayGames(['away', 'home']);
    const fullLeaderboards = home.data.map((homeTeam: ILeaderboard) => {
      const teamAway = away.data.find((awayTeam: ILeaderboard) => awayTeam.name === homeTeam.name);
      if (teamAway === undefined) return homeTeam;

      return leaderboardUtils.auxiliaryLeaderboards(homeTeam, teamAway);
    });
    return { data: leaderboardUtils.sortLeaderboards(fullLeaderboards), status: 200 };
  }
}
