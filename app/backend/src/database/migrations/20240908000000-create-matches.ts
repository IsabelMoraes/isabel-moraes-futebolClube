import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatches from '../../Interfaces/IMatches';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id'

      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals'
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id'
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress'
      }
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('matches');
  }
};