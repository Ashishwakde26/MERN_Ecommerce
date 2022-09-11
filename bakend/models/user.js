const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name can not exceed 30 charactors']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'please enetr valid email address']
    },
    password: {
        type: String,
        required: [true, 'please eneter the password'],
        minlength: [6, 'Password must be longer that 6 charactors'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,

        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


userSchema.methods.comparepassoword = async function (sendPassword) {
    return isMatch = await bcrypt.compare(sendPassword, this.password);

}


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.getResetPasswordToken = function() {

    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60* 1000;

    return resetToken;
}



module.exports =  mongoose.model('user', userSchema);