import React from 'react';
import '../styles/components.css';
import { addFavorite } from '../services/favoriteService';

const BookDetailsContainer = ({ book }) => {
    if (!book) return <p>Yükleniyor...</p>;

    console.log("BOOK IMAGE DEĞERİ:", book);

    const bookImage = book.image
        ? `/images/booksdetails/${book.image}`
        : `/images/booksdetails/default.jpg`;

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
            <div className="book-cover-area">

                <img
                    src={bookImage}
                    alt={book.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/booksdetails/default.jpg';
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
                        ♥️ Favorilere Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsContainer;
