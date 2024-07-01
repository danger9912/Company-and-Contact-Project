const Product = require('../models/productModels');

module.exports = {
  createProduct: async (req, res) => {
    try {
      
      const { name, brand, price, description } = req.body;
      const product = new Product({ name, brand, price, description });
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  getProductById: async (req, res) => {
    const prodId = req.params.id;

    try {
      const product = await Product.findById(prodId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteProduct: async (req, res) => {
    const id = req.body._id;
    try {
      const prod = await Product.findByIdAndDelete(id);
      if (!prod) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateProduct: async (req, res) => {
    const prodId = req.body._id;
    const update = req.body;
  
    try {
      const product = await Product.findByIdAndUpdate(prodId, update, { new: true });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};
