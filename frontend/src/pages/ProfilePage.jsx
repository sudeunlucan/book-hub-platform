import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import BookCard from '../components/BookCard';
import { getFavorites, deleteFavorite } from '../services/favoriteService'; 
import '../styles/profile.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user && user.id) {
                try {
                    const data = await getFavorites(user.id);
                    setFavorites(data);
                } catch (error) {
                    console.error("Favoriler yüklenemedi", error);
                }
            }
        };
        fetchFavorites();
    }, [user?.id]);


    const logout = () => {
        localStorage.removeItem('user');
        window.location.href = "/";
    };

    const removeFavorite = async (favId) => {
        try {
            await deleteFavorite(favId);
            setFavorites(favorites.filter(book => book.fav_id !== favId));
        } catch (error) {
            alert("Kitap silinirken bir hata oluştu.");
            console.error(error);
        }
    };

    return (
        <Layout>
            <div>
                <div className="profile-area">
                    <div className="profile-avatar">
                        {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </div>
                    <h2 className="info">{user.username}</h2>
                </div>

                <div>

                    <h1 className="favorites-section-header">Favorilerim</h1>

                    <div className="books-grid">
                        {favorites && favorites.length > 0 ? (
                            favorites.map(book => (
                                <div key={book.fav_id} className="favorite-card-wrapper">
                                    <BookCard book={book} />
                                    <button 
                                        className="remove-fav-button" 
                                        onClick={() => removeFavorite(book.fav_id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p style={{
                                marginLeft: 16,
                                color:"#483d43", 
                                fontStyle: "italic", 
                                fontWeight: "100", 
                                fontSize: "16px"}}>
                                Henüz favorilerinize eklenmiş kitap yok.
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <button className="logout-button" onClick={logout}>
                        Çıkış
                    </button>
                </div>

            </div>
        </Layout>
    );
};

export default ProfilePage;