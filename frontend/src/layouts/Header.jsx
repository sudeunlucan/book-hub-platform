import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/layout.css';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            try {
                setUser(JSON.parse(loggedInUser));
            } catch (error) {
                console.error("Kullanıcı verisi okunurken hata oluştu:", error);
            }
        }
    }, []);

    return (
        <header className="header">
            <div className="header-content">
                
                <div className="logo" onClick={() => navigate('/')}>
                    <img src="/images/logo2.jpg" alt="logo" />
                </div>

                <div className="header-actions">
                    {user ? (
                        <div className="user-nav">
                            <button 
                                className="profile-button" 
                                onClick={() => navigate('/profil')}
                            >
                                {user.username}
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="login-button" 
                            onClick={() => navigate('/giris')}
                        >
                            Giriş
                        </button>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;