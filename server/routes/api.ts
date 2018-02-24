import * as express from 'express';
import * as status from 'http-status';
export const api = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

import { SecurityRouter } from './security';
import { AuthRouter } from './auth';

/* GET api listing. */
api.get('/', (req, res) => {
  res.send('api works');
});

api.use('/security', new SecurityRouter().router);
api.use('/auth', new AuthRouter().router);

api.use((err, req, res, next) => {
  res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
