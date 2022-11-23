const express = require('express');
const router = express.Router();

const { registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile,
    updatePassword } = require('../controller/authcontroller');


const { isAuthenticated } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/password/update').post(isAuthenticated, updatePassword)

module.exports = router;