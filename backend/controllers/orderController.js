
const mongoose = require('mongoose');
const getOrders = async (req, res) => {
  try {
    const orders = await mongoose.connection.db.collection('shopifyOrders').find().toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTotalSalesOverTime = async (req, res) => {
    try {
      const interval = req.query.interval || 'monthly';
      
      const sales = await mongoose.connection.db.collection('shopifyOrders').aggregate([
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$created_at" } },
              month: { $month: { $toDate: "$created_at" } },
              day: interval === 'daily' ? { $dayOfMonth: { $toDate: "$created_at" } } : null,
              quarter: interval === 'quarterly' ? { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } : null
            },
            totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.quarter": 1 } }
      ]).toArray();
      
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getSalesGrowthRateOverTime = async (req, res) => {
    try {
      const sales = await mongoose.connection.db.collection('shopifyOrders').aggregate([
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$created_at" } },
              month: { $month: { $toDate: "$created_at" } }
            },
            totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]).toArray();
      let previousTotalSales = 0;
      const growthRates = sales.map((entry) => {
        const currentTotalSales = entry.totalSales;
        const growthRate = previousTotalSales > 0 ? ((currentTotalSales - previousTotalSales) / previousTotalSales) * 100 : 0;
        previousTotalSales = currentTotalSales;
        return { ...entry, growthRate };
      });
      
      res.json(growthRates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  getOrders,
  getTotalSalesOverTime,
  getSalesGrowthRateOverTime
  
};
