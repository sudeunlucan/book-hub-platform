const express = require('express');
const router = express.Router();
const { getBookDetails } = require('../models/BookDetails');

router.get('/:id', async (request, response) => {
    try {
        const bookId = request.params.id;
        const bookDetails = await getBookDetails(bookId);

        if (bookDetails) {
            response.json(bookDetails);
        } else {
            response.status(404).json({ 
                message: "Kitap detaylarına erişilirken hata oluştur." 
            });
        }
    } catch (e) {
        response.status(500).json({ 
            message: "Detaylara erişilemedi." 
        });
    }
});

module.exports = router;