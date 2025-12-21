import React from 'react';
import '../styles/components.css';
import { addFavorite } from '../services/favoriteService';

const BookDetailsContainer = ({ book }) => {
    const bookImage = book.image ? `/images/books/${book.image}.jpg` : '/images/books/default.jpg';

    if (!book) return <p>Yükleniyor...</p>;

    const user = JSON.parse(localStorage.getItem('user'));

    const clickFavorite = async () => {
        if (!user) {
            alert("Kitabı favorilere eklemek için lütfen giriş yapın.");
            return;
        }

        try {
            const response = await addFavorite(user.id, book.book_id);
            alert(response.message);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="detail-card">
            <div className="detail-card-left">
                <img 
                    src={bookImage} 
                    alt={book.title} 
                    className="book-cover"
                    onError={(e) => {
                        e.target.src = '/images/books/default.jpg';
                    }}
                />
            </div>
            
            <div className="detail-area">
                <div className="title">
                    <h1>{book.title}</h1>
                    <h3 className="author">{book.author}</h3>
                </div>

                <div className="description">
                    <p className="subject">{book.description}</p>
                    <p><strong>Sayfa Sayısı:</strong> {book.page_count}</p>
                </div>

                <div className="detail-footer">
                    <button className="favorite-button" onClick={clickFavorite}>
                        Favorilere Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsContainer;