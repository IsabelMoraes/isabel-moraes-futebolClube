// src/database/associations.ts
import Team from './TeamModel';
import Match from './MatchModel';

// Defina as associações entre os modelos
const defineAssociations = () => {
  Match.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' });
  Match.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' });
};

export default defineAssociations;
