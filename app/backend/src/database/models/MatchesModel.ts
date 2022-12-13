import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamsModel';
// import OtherModel from './OtherModel';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
  // O trecho a seguir foi implementado após consulta no código do colega Diego Sabino.
  // Fonte: https://sequelize.org/docs/v6/other-topics/scopes/
  scopes: {
    all: { include: [
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    ] },
    inProgress: { where: { inProgress: true },
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] },
    finished: { where: { inProgress: false },
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] },
    homeLeaderboard: { where: { inProgress: false },
    },
  },
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'matches' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'matchesInAway' });

export default Match;
