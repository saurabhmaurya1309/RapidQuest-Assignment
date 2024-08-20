const express = require('express');
const { getOrders, getTotalSalesOverTime, getSalesGrowthRateOverTime} = require('../controllers/orderController');
const router = express.Router();

router.get('/', getOrders);
router.get('/sales-over-time', getTotalSalesOverTime);
router.get('/sales-growth-rate', getSalesGrowthRateOverTime);
module.exports = router;
