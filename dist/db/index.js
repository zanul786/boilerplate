"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var user_1 = require("./user");
var PATH = process.env.DB_PATH || 'mongodb://localhost/test';
mongoose.connect(PATH);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () { return console.log('connected to db ', PATH); });
exports.User = mongoose.model('User', user_1.UserSchema);
//# sourceMappingURL=index.js.map