import { User, Payment } from './../db/index';

class PayPalService {

    public savePayPalPayment = async(loggerInUserDetails, charge) => {
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
            'failureMessage': charge.failure_message, // When status is success, it will be NULL.
            'gateWay' : 'paypal'
        });
        
        return payment;
    }
};



