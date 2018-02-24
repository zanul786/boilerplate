"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var status = require("http-status");
exports.api = express.Router();
// declare axios for making http requests
var axios = require('axios');
var API = 'https://jsonplaceholder.typicode.com';
var auth_1 = require("./auth");
/* GET api listing. */
exports.api.get('/', function (req, res) {
    res.send('api works');
});
exports.api.use('/auth', new auth_1.AuthRouter().router);
exports.api.use(function (err, req, res, next) {
    res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
//# sourceMappingURL=api.js.map