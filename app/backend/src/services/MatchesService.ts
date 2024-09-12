import MatchesModel from '../models/MatchesModel';
import { IMatches, INewMatchData } from '../Interfaces/matches/IMatches';
import { IMachesModel } from '../Interfaces/matches/IMatchesModel';
import { ServiceResponse, ServiceResponseSuccess } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMachesModel = new MatchesModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findFinishedMatches(): Promise<ServiceResponse<IMatches[]>> {
    const finishedMatches = await this.matchesModel.findFinishedMatches();
    return { status: 'SUCCESSFUL', data: finishedMatches };
  }

  public async findMatchesInProgress(): Promise<ServiceResponse<IMatches[]>> {
    const matchesInProgress = await this.matchesModel.findMatchesInProgress();
    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }

  public async updateMatchToFinished(id: IMatches['id']): Promise<ServiceResponseSuccess<object>> {
    await this.matchesModel.updateMatchToFinished(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchInProgress(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['homeTeamGoals'],
  ): Promise<ServiceResponseSuccess<object>> {
    await this.matchesModel.updateMatchInProgress(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async insertNewMatch(newMatchData: INewMatchData) {
    const { homeTeamId, awayTeamId } = newMatchData;
    if (homeTeamId === awayTeamId) {
      return {
        status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const homeTeamExists = await this.matchesModel.findById(homeTeamId);
    const awayTeamExists = await this.matchesModel.findById(homeTeamId);
    if (!homeTeamExists || !awayTeamExists) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    const data = await this.matchesModel.insertNewMatch(newMatchData);
    return { status: 201, data };
  }
}
