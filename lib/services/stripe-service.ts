import * as Stripe from 'stripe';
import { User, Payment } from './../db/index';

class StripeService {
    stripe: Stripe;

    public createCustomer = async (loggerInUserDetails, chargeData) => {
        this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

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
        this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        const charge = await this.stripe.charges.create({
            amount: chargeData.amount,
            currency: chargeData.currency,
            customer: loggerInUserDetails.stripeCustomerId,
            source : chargeData.source
        });
        return charge;
    }

    public createChargeWithOutSavedCard = async (chargeData) =>{
        this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        const charge = await this.stripe.charges.create({
            amount: chargeData.amount,
            currency: chargeData.currency,
            source: chargeData.token.id
        });
        return charge;
    }

    public createChargeWithSource = async (loggerInUserDetails, chargeData, customer) =>{
        this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        const charge = await this.stripe.charges.create({
            amount: chargeData.amount,
            currency: chargeData.currency,
            customer: loggerInUserDetails.stripeCustomerId,
            source: customer.id
        });
        return charge;
    }

    public createSource = async (loggerInUserDetails, chargeData) =>{
        this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

        const customer = await this.stripe.customers.createSource(loggerInUserDetails.stripeCustomerId, {
            source: chargeData.token.id
        });
        return customer;
    }

    public listAllCards = async (loggerInUserDetails) =>{
        this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
        const cardList = await this.stripe.customers.listCards(loggerInUserDetails.stripeCustomerId);
        return cardList;
    }

    public createPayment = async(loggerInUserDetails, charge) => {
        const payment =  await Payment.create({
            'amount': charge.amount,
            'status': charge.status,
            'stripeCustomerId': loggerInUserDetails.stripeCustomerId || 0,
            'chargeId': charge.id,
            'user': loggerInUserDetails._id,
            'cardToken': charge.source.id,
            'transactionId': charge.balance_transaction,
            'email': loggerInUserDetails.email,
            'currency': charge.currency
        });
        return payment;
    }

}
export const stripeService = new StripeService();
