import * as express from 'express';
import { PasswordRoutes } from './routes';

export class PasswordRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.post('/forgotpassword', PasswordRoutes.forgotpassword);
  }
}

