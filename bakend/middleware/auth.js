const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const user = require("../models/user");
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticated = catchAsyncError( async (req, res, next) => {

    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler("Please login first", 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decode.id);

    next();

})

exports.authorizeRoles = (...roles) => (
    (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`User with role ${req.user.role} do not have access`), 403)
        }

        next();
    }
)