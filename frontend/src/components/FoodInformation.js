import React, { useState } from 'react';
import FoodInfo from './FoodInfo';
import '../styles/FoodInfoStyles.css';


function FoodInformation() {
  const [compareFoodInfo, setCompareFoodInfo] = useState(null);

  const handleCompare = (foodInfo) => {
    setCompareFoodInfo(foodInfo);
  };

  return (
    <div className="food-information">
     <div className="fixed-top-navbar">Food Nutrition Information and Comparison</div>
      <div className="food-info-wrapper">
        <div className="food-info-container">
          <div className="food-info-card">
            <FoodInfo onCompare={handleCompare} />
          </div>
          {compareFoodInfo && (
            <div className="food-info-card food-info">
              <h2>{compareFoodInfo.name}</h2>
              <p>Calories: {compareFoodInfo.calories}</p>
              <p>Protein: {compareFoodInfo.protein}</p>
              <p>Vitamins: {compareFoodInfo.vitamins.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodInformation;
