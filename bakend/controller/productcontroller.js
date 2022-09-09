const product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const APIfeatures = require('../middleware/apifeatures');

exports.addProduct = catchAsyncError(async (req, res, next) => {
    const Product =  await product.create(req.body);
    res.status(201).json({
        status:true,
        Product
    })
})


exports.getProduct = catchAsyncError(async (req, res, next) => {

    const resperpage = 4


    const apifeatures = new APIfeatures( product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resperpage)

    const Product = await apifeatures.query;

    res.status(200).json({
        success: true,
        count: Product.length,
        Product
    })
})

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

    const Product = await product.findById(req.params.id);

    
    if(!Product) {
        return next(new ErrorHandler("Product not found", 404));

    }

    res.status(200).json({
        success: true,
        Product
    })

})


exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let Product = await product.findById(req.params.id);

    if(!Product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    Product = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        Product
    })
})

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const Product = await product.findById(req.params.id)

    if(!Product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await Product.remove();

    res.status(200).json({
        success:true,
        message:"Product deleted"
    })

})