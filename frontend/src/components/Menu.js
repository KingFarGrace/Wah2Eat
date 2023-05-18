import React, { useState } from 'react';
import '../styles/MenuStyles.css';
import TopNavbar from './TopNavbar';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Menu');

  const categories = [
    'Menu',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Lose Weight',
    'Keep Health',
  ];

  const renderContent = () => {
    return (
      <div>
        <h2>{selectedCategory}</h2>
        <p>Content for {selectedCategory}.</p>
      </div>
    );
  };

  return (
    <div>
      <TopNavbar />
      <div className="menu-sidebar">
        {categories.map((category) => (
          <a key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </a>
        ))}
      </div>
      <div className="menu-content">{renderContent()}</div>
    </div>
  );
};

export default Menu;
