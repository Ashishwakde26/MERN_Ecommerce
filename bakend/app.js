const express = require('express');
const app = express();

const ErrorMiddleware = require('./middleware/errors');

app.use(express.json());


const product = require('./routes/products');   
const user = require('./routes/user');


app.use('/api/v1', product);
app.use('/api/v1', user);
app.use(ErrorMiddleware);




module.exports = app