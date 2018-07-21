import * as express from 'express';
import { PaymentRoutes } from './routes';

export class PaymentRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.router.post('/charge/create', PaymentRoutes.createCharge);
        this.router.post('/charge/savedCard', PaymentRoutes.chargeSavedCard);
        this.router.get('/getSavedCard', PaymentRoutes.retrieveSavedCard);
        this.router.post('/charge/guestCard', PaymentRoutes.chargeGuestCard);
        this.router.post('/savePayPalPayment', PaymentRoutes.savePayPalPayment);
        this.router.post('/saveCard', PaymentRoutes.saveCard);
        this.router.post('/deleteCard', PaymentRoutes.deleteCard);
    }
}

