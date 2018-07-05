
import * as Nodemailer from 'nodemailer';

export class EmailService {
  transporter;
  constructor() {
    this.transporter = Nodemailer.createTransport( 
      `smtps://<username>%40gmail.com:<password>@smtp.gmail.com` 
    );
  } 
  public sendEmail = (email, link) => {
    var mailOptions = { 
      from : 'from_test@gmail.com', 
      to : email, 
      subject : 'Hello', 
      text: '<a href ='+link+'>Change Password</a>' 
    }; 

    this.transporter.sendMail( mailOptions, (error, info) => { 
      if (error) { 
        return console.log(`error: ${error}`); 
      } 
      console.log(`Message Sent ${info.response}`); 
    }); 
  }
   
}
