const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// POST route to save a new category
router.post('/category', async (req, res) => {
  const { category } = req.body;

  if (!category || category.trim() === "") {
    return res.status(400).json({ error: 'Category cannot be empty' });
  }

  try {
    const newCategory = new Category({ name: category });
    await newCategory.save();
    
    res.status(201).json({ message: 'Category saved successfully', category: newCategory });
  } catch (error) {
    console.error('Error saving category:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to fetch all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
