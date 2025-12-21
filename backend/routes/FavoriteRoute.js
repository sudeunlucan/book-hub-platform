const express = require('express');
const router = express.Router();
const { addFavoriteBook, getUserFavorites, deleteFavoriteBook } = require('../models/Favorite');

router.post('/kitapekle', async (request, response) => {
    const { userId, bookId } = request.body;
    try {
        await addFavoriteBook(userId, bookId);
        response.status(201).json({ 
            message: "Kitap favorilere eklendi." 
        });
    } catch (e) {
        response.status(500).json({ 
            message: "Kitap eklenirken hata oluştu." 
        });
    }
});

router.get('/:userId', async (request, response) => {
    const { userId } = request.params;
    try {
        const favorites = await getUserFavorites(userId);
        response.json(favorites);
    } catch (e) {
        response.status(500).json({ 
            message: "Favoriler listelenirken hata oluştu." 
        });
    }
});

router.delete('/kitapsil/:favId', async (request, response) => {
    const { favId } = request.params;
    try {
        await deleteFavoriteBook(favId);
        response.json({ 
            message: "Kitap favoriler listesinden silindi." 
        });
    } catch (e) {
        response.status(500).json({ 
            message: "Kitap silinirken hata oluştu." 
        });
    }
});

module.exports = router;