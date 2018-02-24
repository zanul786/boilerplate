"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = require("./routes");
var SecurityRouter = /** @class */ (function () {
    function SecurityRouter() {
        this.router = express.Router();
        this.router = express.Router();
        this.router.post('/', routes_1.SecurityRoutes.create);
        this.router.get('/', routes_1.SecurityRoutes.get);
    }
    return SecurityRouter;
}());
exports.SecurityRouter = SecurityRouter;
//# sourceMappingURL=index.js.map