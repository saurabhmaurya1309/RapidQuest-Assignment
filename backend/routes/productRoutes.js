const express = require('express');
const { getProducts ,getProductById,getProductsByType,getProductsByVendor} = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);
router.get('/by-type', getProductsByType);
router.get('/by-vendor', getProductsByVendor);
router.get('/:id', getProductById);


module.exports = router;
