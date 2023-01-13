import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './teams';

class MatchesModel extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

MatchesModel.init({
  id: { primaryKey: true, allowNull: false, autoIncrement: true, type: INTEGER },
  homeTeam: { allowNull: false, type: INTEGER, field: 'home_team' },
  homeTeamGoals: { allowNull: false, type: INTEGER, field: 'home_team_goals' },
  awayTeam: { allowNull: false, type: INTEGER, field: 'away_team' },
  awayTeamGoals: { allowNull: false, type: INTEGER, field: 'away_team_goals' },
  inProgress: { allowNull: false, type: BOOLEAN, field: 'in_progress' },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchesModel;
