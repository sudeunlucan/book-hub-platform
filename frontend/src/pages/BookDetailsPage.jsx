import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../layouts/Layout';
import BookDetailsContainer from '../components/BookDetailsContainer';
import { getBookDetails } from '../services/bookDetailsService';

const BookDetailsPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookId) {
            setLoading(true);
            getBookDetails(bookId)
                .then(data => {
                    console.log("Gelen Veri:", data);
                    
                    if (Array.isArray(data) && data.length > 0) {
                        setBook(data[0]);
                    } else {
                        setBook(data);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [bookId]);

    return (
        <Layout>
            <div className="page-container" style={{ padding: '20px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h2>Kitap detayları hazırlanıyor...</h2>
                    </div>
                ) : book ? (
                    <BookDetailsContainer book={book} />
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h2>Kitap bulunamadı.</h2>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BookDetailsPage;