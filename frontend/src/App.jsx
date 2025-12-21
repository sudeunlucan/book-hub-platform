import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kategori/:categoryId" element={<BooksPage />} />
        <Route path="/kitap/:bookId" element={<BookDetailsPage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;