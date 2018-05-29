import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import { PaymentSchema } from './payment';

const PATH = process.env.DB_PATH || 'mongodb://localhost/test';

mongoose.connect(PATH);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => console.log('connected to db ', PATH));

export const User = mongoose.model('User', UserSchema);
export const Payment = mongoose.model('Payment', PaymentSchema);

