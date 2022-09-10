const catchAsyncError = require("../middleware/catchAsyncError");
const user = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwttoken');


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