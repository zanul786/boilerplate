import * as express from 'express';
import * as status from 'http-status';
import * as Stripe from 'stripe';
import { User, Payment } from './../../db/index';

export class PaymentRoutes {

    public static async createCharge(req, res, next) {
        const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        const loggerInUserDetails = req.user;
        const chargeData = req.body.chargeData;

        if (!loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard) {
            await stripe.customers.create({
                metadata: {
                    Id: loggerInUserDetails.id,
                    UserName: `${loggerInUserDetails.fullName}`,
                },
                source: chargeData.token.id,
                email: loggerInUserDetails.email
            }).then( async function (customer) {                
                await User.findOneAndUpdate({ 'email': loggerInUserDetails.email }, { $set: { stripeCustomerId: customer.id, defaultCardToken: customer.default_source} },
                    function (dbErr, user) {
                        loggerInUserDetails.stripeCustomerId = customer.id;
                        stripe.charges.create({
                            amount: chargeData.amount,
                            currency: 'usd',
                            customer: loggerInUserDetails.stripeCustomerId
                        }).then(async function(charge) {
                            const payment = await Payment.create({
                                'amount': charge.amount,
                                'status': charge.status,
                                'stripeCustomerId': charge.customer,
                                'chargeId': charge.id,
                                'user': loggerInUserDetails._id,
                                'transactionId': charge.balance_transaction,
                                'email': loggerInUserDetails.email,
                                'currency': charge.currency
                            });
                            res.json(payment);
                        });
                    });
            });
        } else{
            await stripe.charges.create({
                amount: chargeData.amount,
                currency: 'usd',
                source: chargeData.token.id
            }).then(async function (charge) {
                const payment = await Payment.create({
                    'amount': charge.amount,
                    'status': charge.status,
                    'chargeId': charge.id,
                    'user': loggerInUserDetails._id,
                    'transactionId': charge.balance_transaction,
                    'email': loggerInUserDetails.email,
                    'currency': charge.currency
                });
                res.json(payment);
            });
        }
    }

    public static async retrieveSavedCard(req, res, next) {
        const loggerInUserDetails = req.user;

        const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        if(loggerInUserDetails.defaultCardToken){
            stripe.customers.retrieveCard(
                loggerInUserDetails.stripeCustomerId,
                loggerInUserDetails.defaultCardToken).
                then(function(card) {
                    res.json(card);
                });
        }else{
            res.sendStatus(status.NO_CONTENT);
        }
    }

    public static async chargeSavedCard(req, res, next){
        const loggerInUserDetails = req.user;
        const chargeData = req.body.chargeData;

        const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        stripe.charges.create({
            amount: chargeData.amount,
            currency: 'usd',
            customer: loggerInUserDetails.stripeCustomerId
        }).then(async function (charge) {
            const payment = await Payment.create({
                'amount': charge.amount,
                'status': charge.status,
                'stripeCustomerId': charge.customer,
                'chargeId': charge.id,
                'user': loggerInUserDetails._id,
                'transactionId': charge.balance_transaction,
                'email': loggerInUserDetails.email,
                'currency': charge.currency
            });
            res.json(payment);
        });
    }
}
