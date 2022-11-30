import TeamsModel from '../database/models/TeamsModel';

export default class MatchService {
  static findAllTeams = async () => {
    const teams = await TeamsModel.findAll();
    if (!teams) {
      throw new Error('Indefinido');
    }
    return teams;
  };

  static findTeamById = async (id:string) => {
    const team = await TeamsModel.findOne({ where: { id } });
    if (!team) {
      throw new Error('Indefinido');
    }
    return team;
  };
}
