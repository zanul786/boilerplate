// NPM Dependencies
import * as express from 'express';
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';

import { ErrorService } from '../../services/error';

// Internal Dependencies
import { User } from '../../db';
import { EmailService } from '../../services/email';
// Helpers
import { getJwtPayload } from './helpers';


export class PasswordRoutes {
  static JWT_SECRET = process.env.JWT_SECRET || 'i am a tea pot';

  public static async forgotpassword (req: express.Request, res: express.Response, next) {
    
    try {
      const emailService = new EmailService();
      const email  = req.body.email;

      if (!email) {
        throw new StandardError({ message: 'Email is requried ', code: status.UNPROCESSABLE_ENTITY });
      }

      const user = await User.findOne({ email });

      // if (!user) {
      //   throw new StandardError({ message: 'Invalid email ', code: status.CONFLICT });
      // }
      emailService.sendEmail(email,'https://www.google.com/')
                  .then((result) => {
                  res.sendStatus(status.OK);
                  })
                  .catch((err) => res.json(err));
      res.json({ token: jwt.encode(getJwtPayload(user),  PasswordRoutes.JWT_SECRET), user });
    } catch (error) {
      next(error);
    }
  }
}
