import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITeam from '../../Interfaces/ITeam';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name'
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('teams');
  }
};