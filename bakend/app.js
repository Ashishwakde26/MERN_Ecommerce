const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const ErrorMiddleware = require('./middleware/errors');

app.use(express.json());
app.use(cookieParser());



const product = require('./routes/products');   
const user = require('./routes/user');


app.use('/api/v1', product);
app.use('/api/v1', user);
app.use(ErrorMiddleware);

module.exports = app