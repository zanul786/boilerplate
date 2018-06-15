// NPM Dependencies
import * as express from 'express';
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';

import { ErrorService } from '../../services/error';

// Internal Dependencies
import { User } from '../../db';

// Helpers
import { getJwtPayload } from './helpers';


export class PasswordRoutes {
  static JWT_SECRET = process.env.JWT_SECRET || 'i am a tea pot';

  public static async forgotpassword (req: express.Request, res: express.Response, next) {
    
    try {
      const { email } = req.body;

      if (!email) {
        throw new StandardError({ message: 'Email is requried ', code: status.UNPROCESSABLE_ENTITY });
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new StandardError({ message: 'Invalid email ', code: status.CONFLICT });
      }
      res.json({ token: jwt.encode(getJwtPayload(user),  PasswordRoutes.JWT_SECRET), user });
    } catch (error) {
      next(error);
    }
  }
}
