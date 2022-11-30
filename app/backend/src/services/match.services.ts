import MatchInterface from '../interfaces/match.interface';
import MatchModel from '../database/models/MatchesModel';

export default class MatchService {
  static findAllMatches = async () => {
    const matches = await MatchModel.scope('all').findAll();
    if (!matches) {
      throw new Error('Indefinido');
    }
    return matches;
  };

  static findMatchesInProgress = async () => {
    const matchesInProgress = await MatchModel.scope('inProgress').findAll();
    if (!matchesInProgress) {
      throw new Error('Indefinido');
    }
    return matchesInProgress;
  };

  static findFinishedMatches = async () => {
    const finishedMatches = await MatchModel.scope('finished').findAll();
    if (!finishedMatches) {
      throw new Error('Indefinido');
    }
    return finishedMatches;
  };

  static createMatch = async (match: MatchInterface) => {
    // console.log(match);

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    try {
      const matchCreated = await MatchModel
        .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });
      return matchCreated;
    } catch (error) {
      console.log(error);
    }
  };
}
