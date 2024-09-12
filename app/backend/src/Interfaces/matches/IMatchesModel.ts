import { IMatches, INewMatchData } from './IMatches';

export interface IMachesModel {
  findAll(): Promise<IMatches[]>,
  findById(id: IMatches['id']): Promise<IMatches | null>
  findFinishedMatches(): Promise<IMatches[]>,
  findMatchesInProgress(): Promise<IMatches[]>,
  updateMatchToFinished(id: IMatches['id']): Promise<object>,
  updateMatchInProgress(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ): Promise<object>,
  insertNewMatch(body: INewMatchData): Promise<IMatches>,
}
