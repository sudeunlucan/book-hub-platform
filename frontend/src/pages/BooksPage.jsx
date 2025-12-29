import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layouts/Layout';
import BookCard from '../components/BookCard';
import { getBooks } from '../services/bookService';

const BooksPage = () => {
    const { categoryId } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const data = await getBooks(categoryId);
                setBooks(data || []);
            } catch (error) {
                console.error("Kitaplar çekilemedi:", error);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) fetchBooks();
    }, [categoryId]);

    return (
        <Layout>
            
            <div className="books-container">
                {loading ? (
                    <p>Kitaplar yükleniyor...</p>
                ) : books.length > 0 ? (
                    books.map(book => <BookCard key={book.book_id} book={book} />)
                ) : (
                    <p>Bu kategoriye ait kitap bulunamadı.</p>
                )}
            </div>

        </Layout>
    );
};

export default BooksPage;