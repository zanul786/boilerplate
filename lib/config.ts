import * as dotenv from 'dotenv';
dotenv.config();

class Config {

  STRIPE_SECRET_KEY: string;
  GMAIL_USER: string;
  GMAIL_PASS: string;
  CONTACT_FORM_TARGET: string;

  constructor() {
    this.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    this.GMAIL_USER = process.env.GMAIL_USER;
    this.GMAIL_PASS = process.env.GMAIL_PASS;
    this.CONTACT_FORM_TARGET = process.env.CONTACT_FORM_TARGET;
  }

}

export const config = new Config();

