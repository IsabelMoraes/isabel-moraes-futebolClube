import { Request, Response, Router } from 'express';
import Team from '../database/models/TeamModel';

const teamController = Router();
// Função para obter todos os times
teamController.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll({
      attributes: ['id', 'teamName'], // Seleciona apenas os campos id e teamName
    });

    // Formata a resposta no formato desejado
    const formattedTeams = teams.map((team: { id: unknown; teamName: unknown; }) => ({
      id: team.id,
      teamName: team.teamName,
    }));

    // Retorna a resposta com status 200 e o JSON formatado
    res.status(200).json(formattedTeams);
  } catch (error) {
    // Trata erros e retorna resposta com status 500
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Função para obter um time específico pelo ID
teamController.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id, {
      attributes: ['id', 'teamName'], // Seleciona apenas os campos id e teamName
    });

    if (team) {
      // Formata a resposta no formato desejado
      res.status(200).json({
        id: team.id,
        teamName: team.teamName,
      });
    } else {
      // Retorna 404 se o time não for encontrado
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    // Trata erros e retorna resposta com status 500
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default teamController;
