
import * as Nodemailer from 'nodemailer';

export class EmailService {
  transporter;
  constructor() {
    this.transporter = Nodemailer.createTransport( 
        {
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'nwacszdcw7ezgh3u@ethereal.email', // generated ethereal user
              pass: 'XAgENSC2VpXedCDVmF' // generated ethereal password
          }
      }
    );
  } 
  public sendEmail = (email, link) => {
    var mailOptions = { 
      from : 'squadc007@gmail.com', 
      to : email, 
      subject : 'Hello', 
      text: '<a href ='+link+'>Change Password</a>' 
    }; 

   return this.transporter.sendMail( mailOptions, (error, info) => { 
      if (error) { 
        return console.log(`error: ${error}`); 
      } 
      console.log(`Message Sent ${info.response}`); 
    }); 
  }
   
}
