const express = require('express');
const router = express.Router();
const {getBooks} = require('../models/Book');

router.get('/', async (request, response) => {
    try {
        const categoryId = request.query.categoryId;
        const bookData = await getBooks(categoryId ? parseInt(categoryId) : null);
        response.json(bookData);
    } catch (e) {
        console.error("Kitap verilerini tarayıcıya gönderirken bir hata oluştu: ", e.message);

        response.status(500).json({ 
            success: false, 
            message: "Kitaplar yüklenemedi." 
        });
    }
});

module.exports = router;