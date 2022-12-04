// Contoh Routing
const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const productController = require('../controllers/api/product.controller');

// Use JWT Check
router.use(auth.authenticateJWT)

// Index
router.get('/products', productController.index);

// Store
router.post('/products', validation.storeProductValidtaion(), validation.validate, productController.store);

// Update
router.put('/products/:_id', validation.updateProductValidtaion(), validation.validate, productController.update);

// Delete
router.delete('/products/:_id', productController.destroy);

module.exports = router;