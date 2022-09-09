const Product = require('../models/product');
const products = require('../data/product.json');
const connetdatabase = require('../config/database');


connetdatabase();

const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log("All products are deleted");

        await Product.insertMany(products);
        console.log("Products are inserted")

        process.exit();
    }catch(error){
        console.log(error);
        process.exit();
    }
}

seedProducts();