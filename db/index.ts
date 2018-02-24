import * as mongoose from 'mongoose';
import { TransactionSchema } from './transaction';
import { SecuritySchema } from './security';
import { UserSchema } from './user';
const PATH = process.env.DB_PATH || 'mongodb://localhost/test';

mongoose.connect(PATH);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => console.log('connected to db ', PATH));

export const Transaction = mongoose.model('Transaction', TransactionSchema);
export const User = mongoose.model('User', UserSchema);
export const Security = mongoose.model('Security', SecuritySchema);
