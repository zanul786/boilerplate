"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var status = require("http-status");
var StandardError = require("standard-error");
var bcrypt = require("bcrypt");
var jwt = require("jwt-simple");
// Internal Dependencies
var db_1 = require("../../../db");
// Helpers
var helpers_1 = require("./helpers");
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
    }
    AuthRoutes.register = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, name_1, existingUser, hashedPassword, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body.user, email = _a.email, password = _a.password, name_1 = _a.name;
                        if (!email) {
                            throw new StandardError({ message: 'Email is required', code: status.UNPROCESSABLE_ENTITY });
                        }
                        if (!password) {
                            throw new StandardError({ message: 'Password is required', code: status.UNPROCESSABLE_ENTITY });
                        }
                        return [4 /*yield*/, db_1.User.findOne({ email: email })];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser) {
                            throw new StandardError({ messgae: 'Email already in use', code: status.CONFLICT });
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 8)];
                    case 2:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, db_1.User.create({ email: email, password: hashedPassword, name: name_1 })];
                    case 3:
                        user = _b.sent();
                        res.json({ token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET) });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthRoutes.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, match, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body.user, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            throw new StandardError({ message: 'Email and Password are requried', code: status.UNPROCESSABLE_ENTITY });
                        }
                        return [4 /*yield*/, db_1.User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new StandardError({ message: 'Invalid email or password', code: status.CONFLICT });
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        match = _b.sent();
                        if (!match) {
                            throw new StandardError({ message: 'Invalid email or password', code: status.CONFLICT });
                        }
                        res.json({ token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET) });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthRoutes.JWT_SECRET = process.env.JWT_SECRET || 'i am a tea pot';
    return AuthRoutes;
}());
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=routes.js.map