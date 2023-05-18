
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        <Link to="/food-info">
          <button>Food Information and Comparison</button>
        </Link>
      </div>
      <div>
        <Link to="/menu">
          <button>Menu Page</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
