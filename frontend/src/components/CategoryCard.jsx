import React from 'react';
import '../styles/components.css';

const CategoryCard = ({ title, image, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="card-image-area">
        <img src={image} alt={title} className="category-image" />
      </div>
      <div className="category-name-area">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;