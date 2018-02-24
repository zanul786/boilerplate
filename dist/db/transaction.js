"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.TransactionSchema = mongoose.Schema({
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
//# sourceMappingURL=transaction.js.map