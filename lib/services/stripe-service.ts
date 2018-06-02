import * as Stripe from 'stripe';
import * as dotevn from 'dotenv';

import { User, Payment } from './../db/index';

dotevn.config();
class StripeService {
    stripe: Stripe;

    constructor() {
        console.log(process.env.STRIPE_SECRET_KEY)
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    public createCustomer = async (loggerInUserDetails, chargeData) => {
        const customer = await this.stripe.customers.create({
            metadata: {
                Id: loggerInUserDetails.id,
                UserName: `${loggerInUserDetails.fullName}`,
            },
            source: chargeData.token.id,
            email: loggerInUserDetails.email
        });
        return customer;
    }

    public createChargeWithSavedCard = async (loggerInUserDetails, chargeData) => {
        const charge = await this.stripe.charges.create({
            amount: chargeData.amount,
            currency: chargeData.currency,
            customer: loggerInUserDetails.stripeCustomerId,
            source : chargeData.source
        });
        return charge;
    }

    public createChargeWithOutSavedCard = async (chargeData) =>{
        const charge = await this.stripe.charges.create({
            amount: chargeData.amount,
            currency: chargeData.currency,
            source: chargeData.token.id
        });
        return charge;
    }

    public createChargeWithSource = async (loggerInUserDetails, chargeData, source) => {
        const charge = await this.stripe.charges.create({
            amount: chargeData.amount,
            currency: chargeData.currency,
            customer: loggerInUserDetails.stripeCustomerId,
            source: source.id
        });
        return charge;
    }

    public createSource = async (loggerInUserDetails, chargeData) =>{
        const customer = await this.stripe.customers.createSource(loggerInUserDetails.stripeCustomerId, {
            source: chargeData.token.id
        });
        return customer;
    }

    public listAllCards = async (loggerInUserDetails) =>{
        const cardList = await this.stripe.customers.listCards(loggerInUserDetails.stripeCustomerId);
        return cardList;
    }

    public createPayment = async(loggerInUserDetails, charge) => {
        const payment =  await Payment.create({
            'amount': charge.amount,
            'status': charge.status,
            'stripeCustomerId': loggerInUserDetails.stripeCustomerId || 0,
            'chargeId': charge.id,
            'user': loggerInUserDetails._id || null,
            'cardToken': charge.source.id,
            'transactionId': charge.balance_transaction,
            'email': loggerInUserDetails.email,
            'currency': charge.currency,
            'failureCode': charge.failure_code, // When status is success, it will be NULL.
            'failureMessage': charge.failure_message // When status is success, it will be NULL.
        });
        return payment;
    }

}
export const stripeService = new StripeService();
