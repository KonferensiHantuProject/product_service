const mongoose = require('mongoose');

// Skema Post
const productSchema = new mongoose.Schema({ 
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product