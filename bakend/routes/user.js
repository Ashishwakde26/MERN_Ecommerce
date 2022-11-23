const express = require('express');
const router = express.Router();

const { registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile,
    updatePassword,
    allUsers, getUserDetails } = require('../controller/authcontroller');


const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/password/update').post(isAuthenticated, updatePassword)


//Admin
router.route('/Admin/allUsers').get(isAuthenticated,authorizeRoles('admin'),allUsers)
router.route('/Admin/getUserDetails/:id').get(isAuthenticated,authorizeRoles('admin'),getUserDetails)

module.exports = router;