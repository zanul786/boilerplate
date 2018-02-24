"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = require("./routes");
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
        this.router = express.Router();
        this.router.post('/register', routes_1.AuthRoutes.register);
        this.router.post('/login', routes_1.AuthRoutes.login);
    }
    return AuthRouter;
}());
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=index.js.map