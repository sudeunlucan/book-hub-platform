import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components.css';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const bookImage = book.image ? `/images/books/${book.image}` : '/images/books/default.jpg';

    return (
        <div className="book-card">
            <div className="book-image-area">
                <img 
                    src={bookImage} 
                    alt={book.title}
                    onError={(e) => {
                        e.target.src = '/images/books/default.jpg';
                    }}
                />
            </div>
            <div className="book-info-area">
                <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="author-name">{book.author}</p>
                </div>
                <button 
                    className="detail-button"
                    onClick={() => navigate(`/kitap/${book.book_id}`)}
                >
                    Detaylar
                </button>
            </div>
        </div>
    );
};
export default BookCard;

