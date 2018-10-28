import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import { PaymentSchema } from './payment';
import { ChatSchema } from './chat';
import { MessageSchema } from './message';

const PATH = process.env.DB_PATH || 'mongodb://localhost/test';

mongoose.connect(PATH);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => console.log('connected to db ', PATH));

export const User = mongoose.model('User', UserSchema);
export const Payment = mongoose.model('Payment', PaymentSchema);
export const Message = mongoose.model('Message', MessageSchema);
export const Chat = mongoose.model('Chat', ChatSchema);
