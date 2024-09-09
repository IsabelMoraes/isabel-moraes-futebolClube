import * as express from 'express';
import 'express-async-errors';

import errorMiddleware from './middlewares/errorMiddleware';
import teamController from './controllers/teamController';
import authRouter from './controllers/authController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    // Não remover essa rota

    this.app.get('/', (req: unknown, res: { json: (arg0: { ok: boolean; }) =>
    unknown; }) => res.json({ ok: true }));
    this.app.use('/teams', teamController);
    // Usando o roteador de autenticação
    this.app.post('/login', authRouter);

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.
      RequestHandler = (_req: unknown, res: { header: (arg0: string, arg1: string) =>
      void; }, next: () => void) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
