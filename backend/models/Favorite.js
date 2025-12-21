const { sql } = require('../config/db');

const addFavoriteBook = async (userId, bookId) => {
    try {
        const connectionPool = await sql.connect();
        await connectionPool.request()
            .input('userId', sql.Int, userId)
            .input('bookId', sql.Int, bookId)
            .query('INSERT INTO favorites (user_id, book_id) VALUES (@userId, @bookId)');
        return { success: true };
    } catch (e) {
        console.error("Favoriler listesine ekleme yapılırken hata oluştu: ", e.message);
        throw e;
    }
};

const getUserFavorites = async (userId) => {
    try {
        const connectionPool = await sql.connect();
        const result = await connectionPool.request()
            .input('userId', sql.Int, userId)
            .query(`
                SELECT f.fav_id, b.book_id, b.title, b.author 
                FROM favorites f
                JOIN books b ON f.book_id = b.book_id
                WHERE f.user_id = @userId
            `);
        return result.recordset;
    } catch (e) {
        console.error("Favoriler listelenirken hata oluştu: ", e.message);
        throw e;
    }
};

const deleteFavoriteBook = async (favId) => {
    try {
        const connectionPool = await sql.connect();
        await connectionPool.request()
            .input('favId', sql.Int, favId)
            .query('DELETE FROM favorites WHERE fav_id = @favId');
        return { success: true };
    } catch (e) {
        console.error("Favoriler listesinden kitap silinirken bir hata oluştu: ", e.message);
        throw e;
    }
};

module.exports = { addFavoriteBook, getUserFavorites, deleteFavoriteBook };