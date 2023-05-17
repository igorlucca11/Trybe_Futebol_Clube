import * as express from 'express';
import routes from './routes';
import Error from './errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/teams', routes.teamsRouter);
    this.app.use('/login', routes.loginRouter);
    this.app.use((error: Error, _req: express
      .Request, res: express.Response, _next: express.NextFunction) => {
      if (error.status) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal error' });
    });
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
