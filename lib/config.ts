import * as dotenv from 'dotenv';
dotenv.config();

class Config {

  STRIPE_SECRET_KEY : string;

  constructor() {
    this.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  }

}

export const config = new Config()

