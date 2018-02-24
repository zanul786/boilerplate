import * as mongoose from 'mongoose';

export const TransactionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  dateBought: {
    type: Date,
    required: true
  },
  priceBought: {
    type: Number,
    required: true
  }
});
