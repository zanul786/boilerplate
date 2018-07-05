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


export class AuthRoutes {
  static JWT_SECRET = process.env.JWT_SECRET || 'i am a tea pot';

  public static async register (req: express.Request, res: express.Response, next) {
    try {

      const { email, password, oauth, name } = req.body.user;

      if (!email) {
        throw new StandardError({ message: 'Email is required', code: status.UNPROCESSABLE_ENTITY });
      }

      if (!password) {
        throw new StandardError({ message: 'Password is required', code: status.UNPROCESSABLE_ENTITY });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new StandardError({ message: 'Email already in use', code: status.CONFLICT });
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ email, password: hashedPassword, name, oauth});
      res.json({ token: jwt.encode(getJwtPayload(user),  AuthRoutes.JWT_SECRET), user });
    } catch (error) {
      next(error);
    }
  }
  public static async registerOauth (req: express.Request, res: express.Response, next) {
    try {

      const { email, oauth, name } = req.body.user;

      if (!email) {
        throw new StandardError({ message: 'Email is required', code: status.UNPROCESSABLE_ENTITY });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new StandardError({ message: 'Email already in use', code: status.CONFLICT });
      }

      const user = await User.create({ email, oauth, name });
      res.json({ token: jwt.encode(getJwtPayload(user),  AuthRoutes.JWT_SECRET), user });
    } catch (error) {
      next(error);
    }
  }

  public static async login (req: express.Request, res: express.Response, next) {
    try {
      const { email, password } = req.body.user;

      if (!email || !password) {
        throw new StandardError({ message: 'Email and Password are requried', code: status.UNPROCESSABLE_ENTITY });
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new StandardError({ message: 'Invalid email or password', code: status.CONFLICT });
      }

      if (user.oauth) {
        throw new StandardError({ message: `You have not registered through ${user.oauth} !`, code: status.CONFLICT });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new StandardError({ message: 'Invalid email or password', code: status.CONFLICT });
      }

      res.json({ token: jwt.encode(getJwtPayload(user),  AuthRoutes.JWT_SECRET), user });
    } catch (error) {
      next(error);
    }
  }
  public static async loginOauth (req: express.Request, res: express.Response, next) {
    try {
      const { email, oauth } = req.body.user;

      if (!email) {
        throw new StandardError({ message: 'Email  is requried', code: status.UNPROCESSABLE_ENTITY });
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new StandardError({ message: 'Invalid email', code: status.CONFLICT });
      }

      if (!user.oauth) {
        throw new StandardError({ message: `You have not registered through ${user.oauth} !`, code: status.CONFLICT });
      }
      res.json({ token: jwt.encode(getJwtPayload(user),  AuthRoutes.JWT_SECRET), user });
    } catch (error) {
      next(error);
    }
  }

  public static async changePassword(req, res, next){
    try{
      const {currentPassword, newPassword } = req.body.passwordDetails;
      const match = await bcrypt.compare(currentPassword, req.user.password);
      if (!match) {
        throw new StandardError({ message: 'Invalid password', code: status.CONFLICT });
      }else{
        const user = await User.findById(req.user._id);
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        user.password = hashedPassword;
        await user.save();
        res.json({ token: jwt.encode(getJwtPayload(user),  AuthRoutes.JWT_SECRET), user });
      }
    }catch(error){
      next(error);
    }

  }
}
