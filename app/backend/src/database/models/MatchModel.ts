import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  import Team from './TeamModel';
  
  class Match extends Model<InferAttributes<Match>, InferCreationAttributes<Match>> {
    declare id: CreationOptional<number>;
    declare homeTeamId: number;
    declare homeTeamGoals: number;
    declare awayTeamId: number;
    declare awayTeamGoals: number;
    declare inProgress: boolean;
  }
  
  Match.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'Matches',
    tableName: 'matches',
    timestamps: false,
  });
  
  export default Match;
  