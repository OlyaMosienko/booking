const mongoose = require('mongoose');
const roles = require('../constants/roles');

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: Number,
            default: roles.RESIDENT,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
