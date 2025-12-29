const { sql } = require('../config/db');

const getBookDetails = async (bookId) => {
    try {
        const connectionPool = await sql.connect();
        const request = connectionPool.request();

        const detailsQuery = `
            SELECT book_id, title, author, description, page_count, category_id, image 
            FROM books 
            WHERE book_id = @bid
        `;

        request.input('bid', sql.Int, bookId);
        const bookDetails = await request.query(detailsQuery);

        return bookDetails.recordset[0];
    } catch (e) {
        console.error('Kitap detay verisi çekilirken hata oluştu: ', e.message);
        throw e;
    }
};

module.exports = { getBookDetails };