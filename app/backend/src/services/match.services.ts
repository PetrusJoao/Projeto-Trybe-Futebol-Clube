import MatchModel from '../database/models/MatchesModel';

export default class LoginService {
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
}
