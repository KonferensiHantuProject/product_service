// Model
const Product = require('../models/Product');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');

// Crypto JS
const CryptoJS = require('crypto-js');

// Validation
const { validationResult } = require('express-validator');

class ProductController{

    // Index
    index = async (req, res) => {
        try {

            console.log('jalan');

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }

}

module.exports = ProductController