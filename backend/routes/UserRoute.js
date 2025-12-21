const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../models/User');

router.post('/register', async (request, response) => {
    
    const { username, email, password, confirmPassword } = request.body;

    if (password !== confirmPassword) {
        return response.status(400).json({ 
            message: "Şifreler birbiriyle eşleşmiyor." 
        });
    }

    try {
        await registerUser(username, email, password);
        response.status(201).json({ 
            message: "Kullanıcı kaydı başarıyla tamamlandı." 
        });
    } catch (e) {
        console.error("Kayıt hatası:", e.message);
        response.status(500).json({ 
            message: "Bu kullanıcı adı veya e-posta zaten kullanımda olabilir." 
        });
    }
});

router.post('/login', async (request, response) => {
    const { username, password } = request.body;

    try {
        const user = await loginUser(username, password);
        if (user) {
            response.json({ 
                message: "Giriş başarılı.", 
                user: { id: user.user_id, username: user.user_name } 
            });
        } else {
            response.status(401).json({ 
                message: "Kullanıcı adı veya şifre hatalı." 
            });
        }
    } catch (e) {
        console.error("Giriş hatası:", e.message);
        response.status(500).json({ 
            message: "Sunucu hatası oluştu." 
        });
    }
});

module.exports = router;