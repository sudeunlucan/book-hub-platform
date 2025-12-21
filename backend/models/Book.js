const {sql} = require('../config/db');

const getBooks = async (categoryId = null) => {
        try {
            const connectionPool = await sql.connect();
            const request = connectionPool.request();

            let booksQuery = 'SELECT book_id, title, author, category_id, image FROM books';
            
            if(categoryId) {
                booksQuery += ' WHERE category_id = @id';
                request.input('id', sql.Int, categoryId);
            }

            const books = await request.query(booksQuery);
            return books.recordset;
        } catch (e) {
            console.error('Veri tabanından kitap çekerken bir hata oluştu: ', e.message);
            throw e;
        }
    }

module.exports = {getBooks};