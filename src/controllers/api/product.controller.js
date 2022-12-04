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

        // Get All Data
        const products = await Product.find()
                            .populate('product_maker', { _id: 1, username: 2, email: 3, first_name: 4, last_name: 5});

        // Return Recieved Data
        return responseBuilder.success(res, products)

    } catch (error) {
        // If Error
        return responseBuilder.errors(res, 500, error.message);
    }
}

// Store
store = async (req, res) => {
    try {

        // Konstanta errors
        const errors = validationResult(req);

        // Kalau error
        if(!errors.isEmpty())
        {
            // Errors
            errors.errors.forEach(error => {
                // Status
                res.status(422);

                // Throw error
                throw new Error(error.msg);
            });

        }else{

            // Adding Product Maker
            req.body.product_maker = req.user.userId;

            // Create Product
            Product.create(req.body, (error, result) => {
    
                // Return 
                return responseBuilder.success(res, result);
            });   
        }

    } catch (error) {
        // If Error
        return responseBuilder.errors(res, 500, error.message);
    }
}

module.exports = {
    index,
    store
};