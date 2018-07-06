import * as express from 'express';
import { PasswordRoutes } from './routes';

export class PasswordRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.post('/forgotpassword', PasswordRoutes.forgotpassword);
    this.router.get('/resetpassword/:token', PasswordRoutes.resetpassword);
    this.router.post('/updatepassword', PasswordRoutes.updatePassword);
  }
}

