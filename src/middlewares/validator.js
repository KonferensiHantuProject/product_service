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
        const duplicate = await Product.findOne({ product_name: value });

        // If there is a duplicate
        if(duplicate && duplicate.name === value){
            throw new Error('Nama Produk Sudah ada Sudah ada')
        }            

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
        const duplicate = await Product.find({ product_name: value });

        // If there is a duplicate
        if(duplicate != 0){
          if(duplicate.length == 1) {
              if(duplicate[0]._id != req.user.userId) {
                  throw new Error('Nama Produk Sudah adaa')
              }
          }else{
              throw new Error('Nama Produk Sudah ada')
          }            
        }         

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