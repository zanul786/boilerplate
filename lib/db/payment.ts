import * as mongoose from 'mongoose';

export const PaymentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    chargeId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    stripeCustomerId: {
        type: String,
    },
    transactionId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    currency: {
        type: String,
        required: true
    },
    metaData: {}
}, { timestamps: true });
