import * as express from 'express';
import * as status from 'http-status';

export class AdminRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
  }
}