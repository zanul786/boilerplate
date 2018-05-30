
import * as Twilio from 'twilio';
import * as dotenv from 'dotenv';
dotenv.load();

const twilioNumber = process.env.TWILIONUMBER;
const accountSid   = process.env.ACCOUNTSID;
const authToken    = process.env.AUTHTOKEN;
const client = new Twilio(accountSid, authToken);

export class MessageService {
  constructor() {}

  public sendMessages = (number, message) => {
    const textContent = {
        body: message,
        to: number,
        from: twilioNumber
    };

   return client.messages.create(textContent)
    .then((res) => res);
  }
  // Validate E164 format
  public validE164 = (num) => {
    return /^\+?[1-9]\d{1,14}$/.test(num);
  }
}
