import React, { useState } from 'react';

const FoodInfo = ({ onCompare }) => {
  const [foodName, setFoodName] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [comparisonFoodName, setComparisonFoodName] = useState('');
  const [comparisonFoodInfo, setComparisonFoodInfo] = useState(null);

  const sampleData = {
    'apple': {
      name: 'Apple',
      calories: 95,
      protein: 0.5,
      vitamins: ['Vitamin C', 'Vitamin A'],
    },
    'banana': {
      name: 'Banana',
      calories: 105,
      protein: 1.3,
      vitamins: ['Vitamin C', 'Vitamin B6'],
    },
  };

  const handleInputChange = (event) => {
    setFoodName(event.target.value);
  };

  const handleComparisonInputChange = (event) => {
    setComparisonFoodName(event.target.value);
  };

  // const handleSubmit = () => {
  //   const foodInfo = sampleData[foodName.toLowerCase()];
  //   setFoodInfo(foodInfo);
  // };

  // const handleCompare = () => {
  //   const comparisonInfo = sampleData[comparisonFoodName.toLowerCase()];
  //   setComparisonFoodInfo(comparisonInfo);
  //   onCompare(comparisonInfo);
  // };
  const handleSubmit = () => {
    fetch(`/food/search?FoodName=${foodName}`)
      .then((response) => response.json())
      .then((data) => setFoodInfo(data))
      .catch((error) => console.error('Error:', error));
  };

const handleCompare = () => {
    fetch(`/food/search?FoodName=${comparisonFoodName}`)
      .then((response) => response.json())
      .then((data) => {
        setComparisonFoodInfo(data);
        onCompare(data);
      })
      .catch((error) => console.error('Error:', error));
  };


  return (
    <div>
      <input type="text" value={foodName} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      {foodInfo && (
        <div>
          <h2>{foodInfo.name}</h2>
          <p>Calories: {foodInfo.calories}</p>
          <p>Protein: {foodInfo.protein}</p>
          <p>Vitamins: {foodInfo.vitamins.join(', ')}</p>
          <input
            type="text"
            value={comparisonFoodName}
            onChange={handleComparisonInputChange}
          />
          <button onClick={handleCompare}>Compare</button>
        </div>
      )}
    </div>
  );
};

export default FoodInfo;
