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

module.exports = router;