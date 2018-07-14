
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
          // auth: {
          //     user: process.env.GMAIL_USER, 
          //     pass: process.env.GMAIL_PASS 
          // } 
          auth: {
            user:'squadc007@gmail.com', 
            pass: 'creative_squad' 
        }
      }
    );
  } 
   public sendEmail = (email, link) => {
    var mailOptions = { 
      from : 'sksanjaychopra8@gmail.com', 
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
        console.log(`Message Sent ${info.response}`);
        resolve(info.response);
      });
        
    });
  }
   
}
