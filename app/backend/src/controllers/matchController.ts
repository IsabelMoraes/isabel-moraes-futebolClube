import { Request, Response } from 'express';
import MatchService from '../service/matchService';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response): Promise<Response> {
    try {
      // Extrai o parâmetro inProgress da query string
      const { inProgress } = req.query;

      // Converte o parâmetro inProgress para um booleano ou undefined
      let isInProgress: boolean | undefined;

      if (typeof inProgress === 'string') {
        if (inProgress === 'true') {
          isInProgress = true;
        } else if (inProgress === 'false') {
          isInProgress = false;
        } else {
          isInProgress = undefined;
        }
      }

      // Chama o serviço passando o parâmetro de filtragem
      const matches = await MatchService.getAllMatches(isInProgress);

      return res.status(200).json(matches);
    } catch (error) {
      console.error('Erro no controller ao buscar as partidas:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar as partidas' });
    }
  }
}

// PS o requisito está quase pronto, so precisa ajeitar o filtro, pq o retorno de in progress é undefined. isso pode ser resolvido no service. Eduardo Cestare tem grande parte feita
