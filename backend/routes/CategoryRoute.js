const express = require('express');
const router = express.Router();
const {getCategories} = require('../models/Category');

router.get('/', async (request, response) => {
  try {
    const categoryData = await getCategories();
    response.json(categoryData);
  } catch (e) {
    console.error("Kategori verilerini tarayıcıya gönderirken bir hata oluştu: ", e.message);

    response.status(500).json({ 
            success: false, 
            message: "Kategoriler yüklenemedi." 
        });
  }
});

module.exports = router;