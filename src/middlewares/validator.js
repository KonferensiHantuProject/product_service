const { body, validationResult, check } = require('express-validator');

// Models
const Product = require('../models/product.model');

// Validation For Create User
createProductValidtaion = () => {
  return [
      // Cek username
      check('username', 'Username Tidak Valid').isString(),

      // Cek email
      check('email', 'Email Tidak Valid').isString(),

      // Cek Fist Name
      check('first_name', 'First Name Tidak Valid').isString(),

      // Cek Last Name
      check('last_name', 'Last Name Tidak Valid').isString(),
  
      // Custom Validation
      body('username').custom(async (value, { req }) => {
  
        // Cek Duplikatnya
        const duplicate = await User.findOne({ username: value });

        // If there is a duplicate
        if(duplicate){
            throw new Error('Username Sudah ada')
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
  createProductValidtaion,
  validate
};