// Contoh Routing
const express = require('express');
const router = express.Router();
const Validator = require('../middlewares/validator');
const Auth = require('../middlewares/auth');
const ProductController = require('../controllers/ProductController');

// Defining Controller
const productController = new ProductController();

// Index
router.get('/', productController.index);

module.exports = router;