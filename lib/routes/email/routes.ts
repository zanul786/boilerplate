// NPM Dependencies
import * as express from 'express';
import * as StandardError from 'standard-error';
import * as status from 'http-status';
// Internal Dependencies
import { EmailService } from '../../services/email';


export class EmailRoutes {
  public static async contactForm (req: express.Request, res: express.Response, next) {
    try {
        const emailService = new EmailService();
        emailService.contactFormSubmission({ lead: req.body.lead });
        res.sendStatus(status.OK);
    } catch (error) {
        next(error);
    }
  }
}
