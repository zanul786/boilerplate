import * as express from 'express';
import * as status from 'http-status';
import * as Stripe from 'stripe';
import { User, Payment } from './../../db/index';
import { stripeService } from './../../services/stripe-service';
import { payPalService } from './../../services/paypal-service';

export class PaymentRoutes {

    public static async createCharge(req, res, next) {

        const loggerInUserDetails = req.user;
        const chargeData = req.body.chargeData;

        if (!loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard) {
            const customer = await stripeService.createCustomer(loggerInUserDetails, chargeData);
            
            const user = await User.update({ 'email': loggerInUserDetails.email},
                                { '$push': { cardTokens : chargeData.token.card.id },
                                            stripeCustomerId: customer.id, 
                                            defaultCardToken: customer.default_source,
                                }
                            );

            loggerInUserDetails.stripeCustomerId = customer.id;
            const charge = await stripeService.createChargeWithSavedCard(loggerInUserDetails, chargeData);

            const payment = await await stripeService.createPayment(loggerInUserDetails, charge);
            res.json(payment);

        }else if(loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard) {
            const chargeData = req.body.chargeData;
            const source = await stripeService.createSource(loggerInUserDetails, chargeData);
            const user = await User.update({ 'email': loggerInUserDetails.email},
                                            { "$push": { "cardTokens": source.id } });
            const charge = await stripeService.createChargeWithSource(loggerInUserDetails, chargeData, source)
            const payment = await stripeService.createPayment(loggerInUserDetails, charge);
            res.json(payment);
        } else {
            const charge = await stripeService.createChargeWithOutSavedCard(chargeData);
            const payment = await stripeService.createPayment(loggerInUserDetails, charge);
            res.json(payment);
        }
    }

    public static async retrieveSavedCard(req, res, next) {
        const loggerInUserDetails = req.user;
        if(loggerInUserDetails && loggerInUserDetails.stripeCustomerId){
            const cardList = await stripeService.listAllCards(loggerInUserDetails);

            if (cardList && cardList.data && cardList.data.length > 0) {
                res.json(cardList.data);
            } else {
                res.sendStatus(status.NO_CONTENT);
            }
        }else {
            res.sendStatus(status.NO_CONTENT);
        }
    }

    public static async chargeSavedCard(req, res, next) {
        const loggerInUserDetails = req.user;
        const chargeData = req.body.chargeData;
        const charge = await stripeService.createChargeWithSavedCard(loggerInUserDetails, chargeData);
        const payment = await stripeService.createPayment(loggerInUserDetails, charge);
        res.json(payment);
    }

    public static async chargeGuestCard(req, res, next) {
        const chargeData = req.body.chargeData;
        const charge = await stripeService.createChargeWithOutSavedCard(chargeData);
        const payment = await stripeService.createPayment({ email : chargeData.email},charge);
        res.json(payment);
    }

    public static async savePayPalPayment(req, res, next) {
        const loggerInUserDetails = req.user;
        const payPalData = req.body.paypalResponse;
        const payment = await payPalService.savePayPalPayment(loggerInUserDetails, payPalData);
        res.json(payment);
    }
    
}
