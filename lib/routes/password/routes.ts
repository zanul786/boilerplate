// NPM Dependencies
import * as express from 'express';
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

      if (!user) {
        throw new StandardError({ message: 'Invalid email ', code: status.CONFLICT });
      }
      const host =  req.protocol+'://'+req.headers.host;
      const link = host+'/api/password/resetpassword/';
      var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),email_id:email},  PasswordRoutes.JWT_SECRET);
      const callbackUrl = '<p>Click <a href="'+ link + token + '">here</a> to reset your password</p>';
      
       emailService.sendEmail(email,callbackUrl)
     

    } catch (error) {
      next(error);
    }
  }
  public static async resetpassword (req: express.Request, res: express.Response, next) {
    const host =  req.protocol+'://'+req.headers.host;
   jwt.verify(req.params.token, PasswordRoutes.JWT_SECRET, function(err, decoded) {
        if(err){
          console.log(err)
        }
        const email = decoded.email_id;
        res.redirect(host+'/reset?email=' + email)
      });
 
  }
  public static async updatepassword (req: express.Request, res: express.Response, next) {
    try {

      const { email, password } = req.body.data;

      if (!email) {
        throw new StandardError({ message: 'Email is required', code: status.UNPROCESSABLE_ENTITY });
      }

      if (!password) {
        throw new StandardError({ message: 'Password is required', code: status.UNPROCESSABLE_ENTITY });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new StandardError({ message: 'Email is not registerd', code: status.CONFLICT });
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.update({ email, password: hashedPassword});
      res.json({email:email});
    } catch (error) {
      next(error);
    }
  }

}
