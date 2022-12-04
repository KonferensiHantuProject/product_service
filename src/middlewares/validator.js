const { body, validationResult, check } = require('express-validator');

// Models
const Product = require('../models/product.model');

// Validation For Create Product
storeProductValidtaion = () => {
  return [
      // Cek Nama Produk
      check('product_name', 'Nama Produk Tidak Valid').isString(),

      // Cek Harga Produk
      check('product_price', 'Harga Produk Tidak Valid').isNumeric(),
  
      // Custom Validation
      body('product_name').custom(async (value, { req }) => {
  
        // Cek Duplikatnya
        const duplicates = await Product.find({ product_name: value });

        // Checking all duplicate
        duplicates.forEach( (duplicate) => {
          // If there is a duplicate
          if(duplicate && duplicate.product_name === value){
              throw new Error('Nama Produk Sudah ada Sudah ada')
          }            
        })


        return true;
  
      })
    ]
}

// Validation For Update Product
updateProductValidtaion = () => {
  return [
      // Cek Nama Produk
      check('product_name', 'Nama Produk Tidak Valid').isString(),

      // Cek Harga Produk
      check('product_price', 'Harga Produk Tidak Valid').isNumeric(),
  
      // Custom Validation
      body('product_name').custom(async (value, { req }) => {
  
        // Cek Duplikatnya
        const duplicates = await Product.find({ product_name: value });

        // Checking all duplicate
        duplicates.forEach( (duplicate) => {
          // If there is a duplicate
          if(duplicate._id != req.params._id && duplicate.product_name === value){
              throw new Error('Nama Produk Sudah ada Sudah ada')
          }            
        })
        

        return true;
  
      })
    ]
}


// Sending Error (Whether Error exist or not)
validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return next()
}

// Exporting modules
module.exports = {
  storeProductValidtaion,
  updateProductValidtaion,
  validate
};