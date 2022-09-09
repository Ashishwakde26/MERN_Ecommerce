const express = require('express');
const router = express.Router();



const { 
    getProduct, 
    addProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
    } = require('../controller/productcontroller')


router.route('/products').get(getProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/product/add').post(addProduct);
router.route('/admin/products/:id')
                                    .put(updateProduct)
                                    .delete(deleteProduct);


module.exports = router;