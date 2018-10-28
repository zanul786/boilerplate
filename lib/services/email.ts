
import * as Nodemailer from 'nodemailer';
import { config } from '../config';
import { realpath } from 'fs';
export class EmailService {
  transporter;
  constructor() {
    this.transporter = Nodemailer.createTransport(
      {
        service: 'Gmail',
        auth: {
          user: config.GMAIL_USER,
          pass: config.GMAIL_PASS
        }
      }
    );
  }

  public contactFormSubmission = ({ lead }) => {
    const mailOptions = {
      from: config.GMAIL_USER,
      to: config.CONTACT_FORM_TARGET,
      subject: `${lead.name} Contact Form Submission`,
      text: `
      Name: ${lead.name},
      Email: ${lead.email},
      Subject: ${lead.subject},
      Message: ${lead.message}
      `
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info);
      });
    });
  }

  public sendPWResetEmail = (email, link) => {
    const mailOptions = {
      from: config.GMAIL_USER,
      to: email,
      subject: 'Reset Password',
      text: link
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`error: ${error}`);
          reject(error);
        }
        info.status = 'Ok';
        resolve(info);
      });
    });
  }

  public sendEmail = ({ subject, email, data }) => {
    const mailOptions = {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: email,
      subject: subject,
      text: data
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info.response);
      });
    });
  }
}
