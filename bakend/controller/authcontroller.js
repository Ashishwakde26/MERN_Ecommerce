const { trusted } = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const user = require('../models/user');


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


    const token = User.getJwtToken();


    res.send({
        success: true, 
        token});


})