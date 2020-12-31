import * as express from 'express';
import * as status from 'http-status';
import { adminUsersRouter } from './users';


export class AdminRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.use('/user', new adminUsersRouter().router);
  }
}
