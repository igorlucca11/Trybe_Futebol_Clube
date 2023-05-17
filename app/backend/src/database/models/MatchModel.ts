import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'id' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'id' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'match' });
Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'match' });

export default Match;
