 import { Request, Response } from 'express';
import Team from '../models/TeamModel';
import { Router } from 'express';

const teamController = Router();
// Função para obter todos os times
 teamController.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll({
      attributes: ['id', 'teamName'] // Seleciona apenas os campos id e teamName
    });

    // Formata a resposta no formato desejado
    const formattedTeams = teams.map((team: { id: any; teamName: any; }) => ({
      id: team.id,
      teamName: team.teamName
    }));

    // Retorna a resposta com status 200 e o JSON formatado
    res.status(200).json(formattedTeams);
  } catch (error) {  
    // Trata erros e retorna resposta com status 500
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default teamController;