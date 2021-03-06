const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    isBlock: {
        type: Boolean,
        default: false,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
    },
    passwordReset: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: ''
    },
    roles: {
        type: String,
        default: 'user'
    },
    isVerify: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: false,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    },
    birthday: {
        type: String,
        required: false
    },
    sex: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    address: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    district: {
        type: String,
        default: "",
    },
    cloudinary_id: {
        type: String,
        default: "",
    },

});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model('users', userSchema, 'users');

module.exports = userModel;