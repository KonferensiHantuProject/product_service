// Model
const Product = require('../../models/product.model');

// Helpers
const responseBuilder = require('../../helpers/responseBuilder');

// Crypto JS
const CryptoJS = require('crypto-js');

// Validation
const { validationResult } = require('express-validator');

// Index
index = async (req, res) => {
    try {

        console.log('jalan');

    } catch (error) {
        // If Error
        return responseBuilder.errors(res, 500, error.message);
    }
}

module.exports = {
    index
};