const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log(process.env.PORT);

const connetdatabase = () => {
    mongoose.connect('mongodb://localhost:27017/shopit', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true
    }).then (con => {
        console.log(`Database connection successful: ${con.Connection.host}`)
    })
}

module.exports = connetdatabase