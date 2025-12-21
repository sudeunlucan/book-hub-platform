import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { login, register } from '../services/userService';
import '../styles/login.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await login({ username: formData.username, password: formData.password });
                alert("Giriş Başarılı!");
                localStorage.setItem('user', JSON.stringify(res.user));
                navigate('/');
            } else {
                if (formData.password !== formData.confirmPassword) return alert("Şifreler eşleşmiyor!");
                await register(formData);
                alert("Kayıt Başarılı! Şimdi giriş yapabilirsiniz.");
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.message || "Bir hata oluştu");
        }
    };

    return (
        <Layout>
            <div className="login-container">
                <div style={{marginRight: 160}}>
                    <img src="/images/bookhub.jpg" alt="resim" />
                </div>
                <div className="login-box">
                    <h2 style={{color: "white"}}>{isLogin ? "Giriş Yap" : "Üye Ol"} </h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            style={{color: "#483d43"}}
                            type="text" placeholder="Kullanıcı Adı" required 
                            onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        />
                        {!isLogin && (
                            <input 
                                style={{color: "#483d43"}}
                                type="email" placeholder="E-posta" required 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            />
                        )}
                        <input 
                            style={{color: "#483d43"}}
                            type="password" placeholder="Şifre" required 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        />
                        {!isLogin && (
                            <input 
                                style={{color: "#483d43"}}
                                type="password" placeholder="Şifre Tekrar" required 
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                            />
                        )}
                        <button type="submit" className="login-area-button" style={{fontWeight: 'bold'}}>
                            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                        </button>
                    </form>
                    <p 
                        onClick={() => setIsLogin(!isLogin)} className="toggle-text">
                        {isLogin ? "Hesabınız yok mu? Üye Olun" : "Zaten hesabınız var mı? Giriş Yapın"}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;