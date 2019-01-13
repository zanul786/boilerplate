import * as dotenv from 'dotenv';
dotenv.config();

class Config {

  STRIPE_SECRET_KEY: string;
  GMAIL_USER: string;
  GMAIL_PASS: string;
  CONTACT_FORM_TARGET: string;
  MAILCHIMP_KEY: string;
  MAILCHIMP_LIST_ID: string;

  constructor() {
    this.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    this.GMAIL_USER = process.env.GMAIL_USER;
    this.GMAIL_PASS = process.env.GMAIL_PASS;
    this.CONTACT_FORM_TARGET = process.env.CONTACT_FORM_TARGET;
    this.MAILCHIMP_KEY = process.env.MAILCHIMP_KEY;
    this.MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  }

}

export const config = new Config();

