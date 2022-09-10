const express = require('express');
const router = express.Router();



const { 
    getProduct, 
    addProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
    } = require('../controller/productcontroller')

const { isAuthenticated } = require('../middleware/auth');

router.route('/products').get(getProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/product/add').post(isAuthenticated, addProduct);
router.route('/admin/products/:id')
                                    .put(isAuthenticated, updateProduct)
                                    .delete(isAuthenticated, deleteProduct);


module.exports = router;