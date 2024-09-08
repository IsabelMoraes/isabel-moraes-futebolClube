
import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUsers from '../../Interfaces/IUsers';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Model<IUsers>>('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Users');
  }
};