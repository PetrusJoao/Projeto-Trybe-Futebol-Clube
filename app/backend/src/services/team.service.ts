import TeamsModel from '../database/models/TeamsModel';

export default class TeamService {
  static findAllTeams = async () => {
    const teams = await TeamsModel.findAll();
    if (!teams) {
      throw new Error('Indefinido');
    }
    return teams;
  };

  static findTeamById = async (id: string | number) => {
    const team = await TeamsModel.findByPk(id);

    return team;
  };
}
