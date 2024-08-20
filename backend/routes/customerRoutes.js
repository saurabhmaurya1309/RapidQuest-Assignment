const express = require('express');
const { getCustomers, getNewCustomersOverTime ,getRepeatCustomers,getGeographicalDistribution,getCustomerLifetimeValueByCohorts} = require('../controllers/customerController');
const router = express.Router();

router.get('/', getCustomers);
router.get('/new-over-time', getNewCustomersOverTime);
router.get('/repeat-customers', getRepeatCustomers);
router.get('/geographical-distribution', getGeographicalDistribution);
router.get('/lifetime-value-by-cohorts', getCustomerLifetimeValueByCohorts);

module.exports = router;
