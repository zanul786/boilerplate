import * as express from 'express';
import * as status from 'http-status';

import { AdminRouter } from './admin/admin';
import { AuthRouter } from './auth';

export const api = express.Router();

api.use('/admin', new AdminRouter().router);

api.use('/auth', new AuthRouter().router);

api.use((err, req, res, next) => {
  res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
