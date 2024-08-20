
const mongoose = require('mongoose');
const getCustomers = async (req, res) => {
  try {
    const customers = await mongoose.connection.db.collection('shopifyCustomers').find().toArray();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNewCustomersOverTime = async (req, res) => {
    try {
      const interval = req.query.interval || 'monthly'; 
      
      const newCustomers = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$created_at" } },
              month: { $month: { $toDate: "$created_at" } },
              day: interval === 'daily' ? { $dayOfMonth: { $toDate: "$created_at" } } : null,
              quarter: interval === 'quarterly' ? { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } : null
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.quarter": 1 } }
      ]).toArray();
      
      res.json(newCustomers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  const getRepeatCustomers = async (req, res) => {
    try {
      const interval = req.query.interval || 'monthly';
  
      const repeatCustomers = await mongoose.connection.db.collection('shopifyOrders').aggregate([
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$created_at" } },
              month: { $month: { $toDate: "$created_at" } },
              day: interval === 'daily' ? { $dayOfMonth: { $toDate: "$created_at" } } : null,
              quarter: interval === 'quarterly' ? { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } : null
            },
            customers: { $addToSet: "$customer.id" }
          }
        },
        {
          $project: {
            _id: 1,
            customerCount: { $size: "$customers" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.quarter": 1 } }
      ]).toArray();
      
      res.json(repeatCustomers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  const getGeographicalDistribution = async (req, res) => {
    try {
      const distribution = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
        {
          $group: {
            _id: "$default_address.city",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]).toArray();
      
      res.json(distribution);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getCustomerLifetimeValueByCohorts = async (req, res) => {
    try {
      const cohortValues = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
        {
          $lookup: {
            from: 'shopifyOrders',
            localField: 'id',
            foreignField: 'customer.id',
            as: 'orders'
          }
        },
        {
          $unwind: "$orders"
        },
        {
          $group: {
            _id: {
              cohortMonth: { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } },
              customerId: "$id"
            },
            lifetimeValue: { $sum: { $toDouble: "$orders.total_price_set.shop_money.amount" } }
          }
        },
        {
          $group: {
            _id: "$_id.cohortMonth",
            cohortLifetimeValue: { $sum: "$lifetimeValue" }
          }
        },
        { $sort: { "_id": 1 } }
      ]).toArray();
      
      res.json(cohortValues);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
  getCustomers,
  getNewCustomersOverTime,
  getRepeatCustomers,
  getGeographicalDistribution,
  getCustomerLifetimeValueByCohorts
};
