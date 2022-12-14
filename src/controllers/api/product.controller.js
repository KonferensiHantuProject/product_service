// Model
const Product = require('../../models/product.model');

// Helpers
const responseBuilder = require('../../helpers/responseBuilder');
const rabbitmqHelper = require('../../helpers/rabbitmq.helper');

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
                
                // Send Information to Rabbit Mq
                rabbitmqHelper.send(req.user.userId, result._id, 'Membuat Product');

                // Return 
                return responseBuilder.success(res, result);
            });   
        }

    } catch (error) {
        // If Error
        return responseBuilder.errors(res, 500, error.message);
    }
}

// Update Product
update = async (req, res) => {
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
            // Finding product
            const product = await Product.findOne({  _id: req.params._id });
            
            if(product == null) {
                // Status
                res.status(404);

                // Throw error
                throw new Error('Product Not Found');
            }

            // Update Product
            await product.updateOne(req.body).then( (result) =>{

                // Send Information to Rabbit Mq
                rabbitmqHelper.send(product.product_maker, req.params._id, 'Mengupdate Product');

                return responseBuilder.success(res, result);
            });
        }

    } catch (error) {
        // If Error
        return errors(res, res.statusCode, error.message);
    }
}

// Delete Product
destroy = async (req, res) => {
    try {

        // Finding product
        const product = await Product.findOne({  _id: req.params._id });

        // Delete Process
        product.deleteOne().then((result) => {

            // Send Information to Rabbit Mq
            rabbitmqHelper.send(product.product_maker, req.params._id, 'Menghapus Product');

            // Redirect 
            return responseBuilder.success(res, 'Product Deleted');
        });     

    } catch (error) {
        // If Error
        return responseBuilder.errors(res, 500, error.message);
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
};