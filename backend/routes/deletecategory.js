const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); 

router.delete('/delete/:id', async (req, res) => {
  try {
    const categoryId = req.params.id; 
    console.log(categoryId);
    
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
