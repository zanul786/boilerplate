
import * as Nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { realpath } from 'fs';
dotenv.load();
export class EmailService {
  transporter;
  constructor() {
    this.transporter = Nodemailer.createTransport( 
        {
          service: "Gmail",
          auth: {
              user: process.env.GMAIL_USER, 
              pass: process.env.GMAIL_PASS 
          } 
      }
    );
  } 
  
  public sendPWResetEmail = (email, link) => {
    var mailOptions = { 
      from : process.env.PW_RESET_FROM, 
      to : email, 
      subject : 'Reset Password', 
      text: link
    }; 

    return new Promise((resolve, reject) => {
      this.transporter.sendMail( mailOptions, (error, info) => { 
        if (error) { 
          console.log(`error: ${error}`); 
          resolve(error)
        } 
         info.status = 'Ok';
        resolve(info);
      });
        
    });
  }
   
}
