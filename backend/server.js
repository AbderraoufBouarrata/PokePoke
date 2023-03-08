const app = require('./app');
const cors = require('cors');
const dotenv = require('dotenv');

//handling uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
})

//setting up config file
dotenv.config({ path: 'backend/config/config.env' });

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    app.close(() => {
        process.exit(1);
    })
})