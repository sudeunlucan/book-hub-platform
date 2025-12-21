import React from 'react';
import '../styles/layout.css';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="page-container">
      <Header />

      <main className="page-content">
        {children}
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
        <p>© 2025 BookHubPlatform</p>
      </footer>
    </div>
  );
};

export default Layout;