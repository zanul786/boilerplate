
import * as Nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
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
      text: "'"+link +"'"
    }; 

  return  this.transporter.sendMail( mailOptions, (error, info) => { 
      if (error) { 
        return console.log(`error: ${error}`); 
      } 
      console.log(`Message Sent ${info.response}`);
      return info.response;
    });
  }
   
}
