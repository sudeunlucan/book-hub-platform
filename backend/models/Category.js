const {sql} = require('../config/db');

const getCategories = async () => {
    try {
        const connectionPool = await sql.connect();
        const categoriesQuery = await connectionPool.request().query('SELECT * FROM categories');
        return categoriesQuery.recordset;
    } catch (e) {
        console.error('Veri tabanından kategori çekerken bir hata oluştu: ', e.message);
        throw e;
    }
};

module.exports = {getCategories}; 



