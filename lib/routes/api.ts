import * as express from 'express';
import * as status from 'http-status';

import { AdminRouter } from './admin/admin';
import { AuthRouter } from './auth';
import { PaymentRouter } from './payment';
import { Middleware } from '../services/middleware';

const middleware = new Middleware();

export const api = express.Router();
api.use(middleware.jwtDecoder);

api.use('/admin', new AdminRouter().router);

api.use('/auth', new AuthRouter().router);

api.use('/payment', new PaymentRouter().router);

api.use((err, req, res, next) => {
  res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
