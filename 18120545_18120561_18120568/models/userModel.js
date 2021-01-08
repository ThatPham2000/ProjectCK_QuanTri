const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    image: String,
    roles: String,
    isVerify: Boolean,
    name: String,
    email: String,
    password: String,
    passwordReset: String,
    phone: String,
    __v: Number,
    isBlock: Boolean,
    address: String
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model('users', userSchema, 'users');

module.exports = userModel;