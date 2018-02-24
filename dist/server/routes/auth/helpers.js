"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
exports.getJwtPayload = function (user) {
    return {
        valid: true,
        fullName: user.fullName,
        firstName: user.name.first,
        id: user._id.toString(),
        expires: moment.utc().add(1, 'day').format('YYYY-MM-DD HH:mm')
    };
};
//# sourceMappingURL=helpers.js.map