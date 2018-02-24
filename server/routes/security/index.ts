import * as express from 'express';
import { SecurityRoutes } from './routes';

export class SecurityRouter {
  router: express.Router = express.Router();
  constructor() {
    this.router = express.Router();
    this.router.post('/', SecurityRoutes.create);
    this.router.get('/', SecurityRoutes.get);
  }
}

