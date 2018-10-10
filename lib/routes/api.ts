import * as express from 'express';
import * as status from 'http-status';

import { AdminRouter } from './admin/admin';
import { AuthRouter } from './auth';
// import { PasswordRouter } from './password';

import { PaymentRouter } from './payment';
import { TwilioRouter } from './twilio';
import { Middleware } from '../services/middleware';
import { EmailRouter } from './email';

const middleware = new Middleware();

export const api = express.Router();
api.use(middleware.jwtDecoder);

api.use('/admin', new AdminRouter().router);

// api.use('/password', new PasswordRouter().router);

api.use('/auth', new AuthRouter().router);

api.use('/payment', new PaymentRouter().router);
api.use('/twilio', new TwilioRouter().router);
api.use('/email', new EmailRouter().router);

api.use((err, req, res, next) => {
  res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
