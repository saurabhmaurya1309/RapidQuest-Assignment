const mongoose = require('mongoose');

const getProducts = async (req, res) => {
  try {
    const products = await mongoose.connection.db.collection('shopifyProducts').find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
    try {
      const productId = parseInt(req.params.id, 10);
      const product = await mongoose.connection.db.collection('shopifyProducts').findOne({ id: productId });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getProductsByType = async (req, res) => {
    try {
        const productType = req.query.type;

        if (!productType) {
            return res.status(400).json({ message: "Product type query parameter is required" });
        }

        const products = await mongoose.connection.db.collection('shopifyProducts').find({ product_type: productType }).toArray();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for the given type" });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  const getProductsByVendor = async (req, res) => {
    try {
      const vendor = req.query.vendor;
      const products = await mongoose.connection.db.collection('shopifyProducts').find({ vendor }).toArray();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  getProducts,
  getProductById,
  getProductsByType,
  getProductsByVendor
};
