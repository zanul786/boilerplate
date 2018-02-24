"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var transaction_1 = require("./transaction");
var security_1 = require("./security");
var user_1 = require("./user");
var PATH = process.env.DB_PATH || 'mongodb://localhost/test';
mongoose.connect(PATH);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () { return console.log('connected to db ', PATH); });
exports.Transaction = mongoose.model('Transaction', transaction_1.TransactionSchema);
exports.User = mongoose.model('User', user_1.UserSchema);
exports.Security = mongoose.model('Security', security_1.SecuritySchema);
//# sourceMappingURL=index.js.map