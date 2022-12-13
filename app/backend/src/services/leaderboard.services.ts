import Team from '../database/models/TeamsModel';
import MatchModel from '../database/models/MatchesModel';

export default class MatchService {
  static findHomeTeamsMatches = async () => {
    const teams = await Team.findAll();
    const matches = await MatchModel.scope('homeLeaderboard').findAll();
    return teams.map((team) => matches.filter((match) => match.homeTeam === team.id));
  };

  static victoryCounter = async () => {
    const homeMatchs = await this.findHomeTeamsMatches();
    return homeMatchs.map((match) => match
      .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length);
  };

  static draw = async () => {
    const homeMatchs = await this.findHomeTeamsMatches();
    return homeMatchs.map((match) => match
      .filter((matches) => matches.awayTeamGoals === matches.homeTeamGoals).length);
  };

  static lossesCounter = async () => {
    const homeMatchs = await this.findHomeTeamsMatches();
    return homeMatchs.map((match) => match
      .filter((matches) => matches.awayTeamGoals > matches.homeTeamGoals).length);
  };

  static goalsOwnCounter = async () => {
    const homeMatchs = await this.findHomeTeamsMatches();
    return homeMatchs.map((match) => {
      const goals = match.map((matches) => matches.awayTeamGoals);
      return goals.reduce((acc, crt) => acc + crt, 0);
    });
  };

  static goalsFavorCounter = async () => {
    const homeMatchs = await this.findHomeTeamsMatches();
    return homeMatchs.map((match) => {
      const allGoals = match.map((matches) => matches.homeTeamGoals);
      return allGoals.reduce((acc, crt) => acc + crt, 0);
    });
  };

  static pointsCounter = async () => {
    const draws = await this.draw();
    const victories = await this.victoryCounter();
    return victories.map((victory, i) => victory * 3 + draws[i]);
  };

  static matchesCounter = async () => {
    const homeMatchs = await this.findHomeTeamsMatches();
    return homeMatchs.map((match) => match.length);
  };

  static async efficiency() {
    const points = await this.pointsCounter();
    const totalGames = await this.matchesCounter();
    return points.map((point, i) => point / ((totalGames[i] * 3) / 100));
  }

  static async balance() {
    const goalsOwn = await this.goalsOwnCounter();
    const goalsFavor = await this.goalsFavorCounter();
    return goalsFavor.map((goal, i) => goal - goalsOwn[i]);
  }

  static async getLeaderboard() {
    const teams = await Team.findAll();
    const leaderboard = await Promise.all(
      teams.map(async (team, i) => ({
        name: team.teamName,
        totalPoints: Object.values(await this.pointsCounter())[i],
        totalGames: Object.values(await this.matchesCounter())[i],
        totalVictories: Object.values(await this.victoryCounter())[i],
        totalDraws: Object.values(await this.draw())[i],
        totalLosses: Object.values(await this.lossesCounter())[i],
        goalsFavor: Object.values(await this.goalsFavorCounter())[i],
        goalsOwn: Object.values(await this.goalsOwnCounter())[i],
        goalsBalance: Object.values(await this.balance())[i],
        efficiency: Object.values(await this.efficiency())[i].toFixed(2),
      })),
    );
    return leaderboard.sort((home, away) =>
      away.totalPoints - home.totalPoints || away.goalsBalance - home.goalsBalance
      || away.goalsFavor - home.goalsFavor || away.goalsOwn - home.goalsOwn);
  }
}
