const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    roles: String,
    isVerify: Boolean,
    name: String,
    email: String,
    password: String,
    passwordReset: String,
    phone: String,
    __v: Number
});

const userModel = mongoose.model('users', userSchema, 'users');

module.exports = userModel;