const { sql } = require('../config/db');

const registerUser = async (username, email, password) => {
    try {
        const connectionPool = await sql.connect();
        await connectionPool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO users (user_name, email, password) VALUES (@username, @email, @password)');
        return { success: true };
    } catch (e) {
        console.error("Kullanıcı kayıt olurken hata oluştu:", e.message);
        throw e;
    }
};

const loginUser = async (username, password) => {
    try {
        const connectionPool = await sql.connect();
        const user = await connectionPool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM users WHERE user_name = @username AND password = @password');
        
        return user.recordset[0];
    } catch (e) {
        console.error("Kullanıcı giriş yaparken hata oluştu:", e.message);
        throw e;
    }
};

module.exports = { registerUser, loginUser };