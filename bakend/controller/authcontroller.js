const catchAsyncError = require("../middleware/catchAsyncError");
const user = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwttoken');
const sentEmail = require('../utils/sentEmail');
const crypto = require('crypto');


exports.registerUser = catchAsyncError( async (req, res, next) => {

    const { name, email, password} = req.body

    const User = await user.create({
        name, 
        password, 
        email,
        avatar: {
            public_id:'_processed_/1/1/csm_man-holger-von-der-heide-interview-header_807931fc5c',
            url:'https://www.mantruckandbus.com/fileadmin/_processed_/1/1/csm_man-holger-von-der-heide-interview-header_807931fc5c.jpg'
        }
    
    })


    sendToken(User, 200, res);


})


exports.loginUser = catchAsyncError( async (req, res, next) =>{

    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and pasword", 400));
    }

    const User = await user.findOne({email}).select('+password')
    if(!User) {
        return next(new ErrorHandler("Invalid Email or password", 401))
    }

    const isPasswordMatched = await User.comparepassoword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    
    sendToken(User, 200, res);
})


//Get currently logged in user detais => /api/v1/me

exports.getUserProfile = catchAsyncError( async (req, res, next) => {
    const User = await user.findById(req.user.id)

    res.status(200).json({
        success: true,
        User
    });
})


//Update Password => /api/v1/password/update
exports.updatePassword = catchAsyncError( async ( req, res, next) => {

    const User = await user.findById(req.user.id).select('+password')
    const {password, oldPassword} = req.body;
    const isMatched = await User.comparepassoword(oldPassword)

    if(!isMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }

    User.password = password;

    await User.save();

    res.status(200).json({
        success: true,
        User
    })

})


exports.logout = catchAsyncError( async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })

})


exports.forgotPassword = catchAsyncError( async (req, res, next) => {

    const email = req.body.email;

    if(!email) {
        return next(new ErrorHandler("Please enter the email address", 401))
    }

    const User = await user.findOne({email})

    if(!User) {
        return next(new ErrorHandler('User not found with this email id', 404))
    }

    const resetToken = User.getResetPasswordToken();
    await User.save({ validateBeforeSave: false})

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl} \n\n If you have not 
    requested this email, then ignore it.`

    try {

        await sentEmail({
            email: User.email,
            subject: 'ShopIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        User.resetPasswordToken = undefined;
        User.resetPasswordExpire = undefined;

        await User.save({ validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
})


// Reset password  => api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async (req, res, next) => {

    const { Password, confirmPassword } = req.body;

    const resetToken = req.params.token
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const User = await user.findOne({
        resetPasswordToken,
        // resetPasswordExpire: { $gt: Date.now()}
    })

    if(!User) {
        return next(new ErrorHandler("Password reset token has been invalid or expired", 400) )
    }

    if( Password !== confirmPassword ) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    User.password = Password;
    await User.save()

    res.status(200).json({
        success: true,
        message: "Password Updated"
    })
})