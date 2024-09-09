import { Request, Response, Router } from 'express';
import Team from '../database/models/TeamModel';

const teamController = Router();
// Função para obter todos os times
teamController.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll({
      attributes: ['id', 'teamName'],
    });

    const formattedTeams = teams.map((team: { id: unknown; teamName: unknown; }) => ({
      id: team.id,
      teamName: team.teamName,
    }));

    res.status(200).json(formattedTeams);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Função para obter um time específico pelo ID
teamController.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id, {
      attributes: ['id', 'teamName'],
    });

    if (team) {
      res.status(200).json({
        id: team.id,
        teamName: team.teamName,
      });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default teamController;
