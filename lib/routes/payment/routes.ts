import * as express from 'express';
import * as status from 'http-status';
import * as Stripe from 'stripe';

export class PaymentRoutes {
    public static async createCharge (req: express.Request, res: express.Response, next) {
        console.log(req);
        const stripe = new Stripe('pk_test_W9u8uhxx4LjCfikLb86saZrh');
    }
}
