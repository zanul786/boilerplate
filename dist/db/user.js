"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });
exports.UserSchema.pre('save', function (next) {
    var email = this.get('profile.email');
    if (email) {
        this.profile.email = this.profile.email.toLowerCase();
    }
    var firstName = this.firstName;
    if (firstName) {
        this.set('profile.name.first', firstName.trim());
    }
    var lastName = this.get('profile.name.last');
    if (lastName) {
        this.set('profile.name.last', lastName.trim());
    }
    next();
});
exports.UserSchema.virtual('fullName').get(function () {
    return this.name.first + " " + this.name.last;
});
//# sourceMappingURL=user.js.map