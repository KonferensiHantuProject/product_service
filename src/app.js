const express = require('express');
const methodOverride = require('method-override');

// Env
require('dotenv').config();

// Connection
require('./config/db');

// Rabbit Mq
require('./config/rabbitmq');

const app = express();

// Set up method override
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seperate Route
const product_auth = require('./routes/product.route');
app.use('/api/v1', product_auth);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
});