import * as express from 'express';
import * as status from 'http-status';
import * as Stripe from 'stripe';
import { User, Payment } from './../../db/index';
import { stripeService } from './../../services/stripe-service';
import { PaymentErrorHandlerService } from './payment-error-handler';
import * as StandardError from 'standard-error';
import { payPalService } from './../../services/paypal-service';

export class PaymentRoutes {

    public static async createCharge(req, res, next) {
        const loggerInUserDetails = req.user;
        const chargeData = req.body.chargeData;
        let customer;
        if (!loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard) {
            try{
                customer = await stripeService.createCustomer({loggerInUserDetails, chargeData});
                const user = await User.findByIdAndUpdate(loggerInUserDetails._id, 
                                                { '$push': { cardTokens : chargeData.token.card.id },
                                                            stripeCustomerId: customer.id, 
                                                            defaultCardToken: customer.default_source,
                                                }, {new: true});
                loggerInUserDetails.stripeCustomerId = customer.id;
                const charge = await stripeService.createChargeWithSavedCard({loggerInUserDetails, chargeData});
                const payment = await await stripeService.createPayment({loggerInUserDetails, charge});
                res.json(payment);
            } catch(error){
                PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
            }
        } else if (loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard) {
            try{
                const source = await stripeService.createSource({loggerInUserDetails, chargeData});
                const user = await User.findByIdAndUpdate(loggerInUserDetails._id, { $push: { cardTokens: source.id } }, {new: true});
                const charge = await stripeService.createChargeWithSource({loggerInUserDetails, chargeData, source})
                const payment = await stripeService.createPayment({loggerInUserDetails, charge});
                res.json(payment);
            }catch(error){
                PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
            }
        } else {
            try{
                const charge = await stripeService.createChargeWithOutSavedCard(chargeData);
                const payment = await stripeService.createPayment({loggerInUserDetails, charge});
                res.json(payment);
            }catch(error){
                PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
            }
        }
    }

    public static async retrieveSavedCard(req, res, next) {
        const loggerInUserDetails = req.user;
        try{
            if (loggerInUserDetails && loggerInUserDetails.stripeCustomerId){
                const cardList = await stripeService.listAllCards(loggerInUserDetails);
                if (cardList && cardList.data && cardList.data.length > 0) {
                    res.json(cardList.data);
                } else {
                    res.sendStatus(status.NO_CONTENT);
                }
            } else {
                res.sendStatus(status.NO_CONTENT);
            }
        }catch(error){
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }

    public static async chargeSavedCard(req, res, next) {
        try{
            const loggerInUserDetails = req.user;
            const chargeData = req.body.chargeData;
            const charge = await stripeService.createChargeWithSavedCard({loggerInUserDetails, chargeData});
            const payment = await stripeService.createPayment({loggerInUserDetails, charge});
            res.json(payment);
        }catch(error){
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }

    public static async chargeGuestCard(req, res, next) {
        try{
            const chargeData = req.body.chargeData;
            const charge = await stripeService.createChargeWithOutSavedCard(chargeData);
            const loggerInUserDetails = { email : chargeData.email};
            const payment = await stripeService.createPayment({loggerInUserDetails, charge});
            res.json(payment);
        }catch(error){
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }

    public static async savePayPalPayment(req, res, next) {
        const loggerInUserDetails = req.user;
        const payPalData = req.body.paypalResponse;
        const payment = await payPalService.savePayPalPayment(loggerInUserDetails, payPalData);
        res.json(payment);
    }

    public static async saveCard(req, res, next) {
        const loggerInUserDetails = req.user;
        const {chargeData} = req.body;
        try{
            if (!loggerInUserDetails.stripeCustomerId) {
                const customer = await stripeService.createCustomer({loggerInUserDetails, chargeData});
                const user = await User.findByIdAndUpdate(loggerInUserDetails._id,
                { '$push': { cardTokens : chargeData.token.card.id },
                            stripeCustomerId: customer.id, 
                            defaultCardToken: customer.default_source,
                }, {new: true});
                res.json(user);
            }else{
                const source = await stripeService.createSource({loggerInUserDetails, chargeData});
                const user = await User.findByIdAndUpdate(loggerInUserDetails._id, { $push: { cardTokens: source.id } }, {new: true});
                res.json(user);
            }
        }catch(error){
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }

    public static async deleteCard(req, res, next) {
        const loggerInUserDetails = req.user;
        const email = req.user.email;
        const {chargeData} = req.body;
        try{
            const confirmation = await stripeService.deleteCard({loggerInUserDetails, chargeData});
            if(confirmation.deleted){
                let updatedUser;
                const user = await User.findByIdAndUpdate(loggerInUserDetails._id, { $pull: { cardTokens: chargeData.source } }, { new: true });
                if(user.cardTokens && user.cardTokens.length > 0){
                    user.defaultCardToken = user.cardTokens[0];
                    updatedUser = await user.save();
                }else{
                    user.defaultCardToken = '';
                    updatedUser = await user.save();
                }
                res.json(updatedUser);
            }
        }catch(error){
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }
    
}
