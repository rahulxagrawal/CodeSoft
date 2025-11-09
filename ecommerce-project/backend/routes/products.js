const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products?search=&category=&min=&max=
router.get('/', async (req, res) => {
  try {
    const { search, category, min, max } = req.query;
    let filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (min || max) filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);
    const products = await Product.find(filter).limit(100);
    res.json(products);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try { const product = await Product.findById(req.params.id); res.json(product); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
