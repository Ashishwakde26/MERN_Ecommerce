const app = require('./app');
const connetdatabase = require('./config/database');
const dotenv = require('dotenv');

dotenv.config({ path:'bakend/config/config.env'});

//Handle uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    process.exit(1);
})

connetdatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is started: ${process.env.PORT}`);
})

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err}`);
    server.close(() => {
        process.exit(1);
    })
})