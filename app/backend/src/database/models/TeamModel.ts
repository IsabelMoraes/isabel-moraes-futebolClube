import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  
  class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare id: CreationOptional<number>;
    declare teamName: string;
  }
  
  Team.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'Team',
    timestamps: false,
    tableName: 'teams',
  });
  
  export default Team;
  