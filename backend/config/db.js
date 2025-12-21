require('dotenv').config();
const sql = require('mssql'); 

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10), 

    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function dbConnection() {
    try {
        await sql.connect(config); 
        console.log("Veri tabanı bağlantısı başarıl bir şekilde gerçekleşti.");
    } catch (e) {
        console.error("Veri tabanı ile bağlantı kurulurken bir hata oluştu: ", e.message);
        process.exit(1); 
    }
}

module.exports = {
    dbConnection,
    sql
};
