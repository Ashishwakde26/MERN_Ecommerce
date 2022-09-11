const express = require('express');
const router = express.Router();



const { 
    getProduct, 
    addProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
    } = require('../controller/productcontroller')

const { isAuthenticated, authorizeRoles } = require('../middleware/auth');


router.route('/products').get(isAuthenticated, authorizeRoles('admin'), getProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/product/add').post(isAuthenticated, authorizeRoles('admin'), addProduct);
router.route('/admin/products/:id')
                                    .put(isAuthenticated, authorizeRoles('admin'), updateProduct)
                                    .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct);


module.exports = router;