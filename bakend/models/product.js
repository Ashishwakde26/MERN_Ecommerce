const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter the product name'],
        trim: true,
        maxLength: [100, 'product length can not exceed 100 charactors']
    },
    price: {
        type: Number,
        required: [true, 'please enter the product prise'],
        maxLength: [5, 'product length can not exceed 5 charactors'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'please enter the product description'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    catagories: {
        type: String,
        required: [true, 'Please select the product catagory'],
        enum: {
            
            values: [
                'Electronic',
                'camera',
                'Laptop',
                'Accessories',
                'Food',
                'Books',
                'Cloths/shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select the correct catagory for Product'
        }
    },
    seller:{
        type: String,
        required: [true, 'please end seller of product']
    },
    stock: {
        type: Number,
        required: [true, 'please enter the product stock'],
        maxLength: [5, 'product stock should not increase more than 5'],
        default: 0
    },
    NumOfReviews: {
        type: Number,
        dafault: 0
    },
    reviews: [
        {
            name: {
                type: String,
                reqired: true
            },
            rating: {
                type: String,
                required: true
            },
            Comment: {
                type: String,
                required: true
            }
        }
    ],
    createAt: {
        type: Date,
        Default: Date.now
    }
    
});

module.exports = mongoose.model("product", productSchema );