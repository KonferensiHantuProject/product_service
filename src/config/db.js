const mongoose = require('mongoose');

// Env
require('dotenv').config()

// User Model
require('../models/user.model')

// Connect Mongo
mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DATABASE_NAME);