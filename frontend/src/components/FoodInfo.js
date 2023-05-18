import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodInfo = ({ onCompare }) => {
  const [foodName, setFoodName] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [comparisonFoodName, setComparisonFoodName] = useState('');
  const [comparisonFoodInfo, setComparisonFoodInfo] = useState(null);

  const handleInputChange = (event) => {
    setFoodName(event.target.value);
  };

  const handleComparisonInputChange = (event) => {
    setComparisonFoodName(event.target.value);
  };

  useEffect(() => {
    if (foodName !== '') {
      axios.get('http://localhost:3000/food/search', { params: { FoodName: foodName } })
        .then(response => {
          setFoodInfo(response.data.foodInfo);
        })
        .catch(error => console.error('Failed to fetch food info', error));
    }

    if (comparisonFoodName !== '') {
      axios.get('http://localhost:3000/food/search', { params: { FoodName: comparisonFoodName } })
        .then(response => {
          setComparisonFoodInfo(response.data.comparisonFoodInfo);
        })
        .catch(error => console.error('Failed to fetch comparison food info', error));
    }
  }, [foodName, comparisonFoodName]);

  const handleCompare = () => {
    onCompare(comparisonFoodInfo);
  };

  return (
    <div>
      <input type="text" value={foodName} onChange={handleInputChange} />
      <button onClick={() => {}}>Submit</button>
      {foodInfo && (
        <div>
          <h2>Food Info</h2>
          {Object.keys(foodInfo).map(key => (
            <p key={key}>{key}: {foodInfo[key]}</p>
          ))}
          <input
            type="text"
            value={comparisonFoodName}
            onChange={handleComparisonInputChange}
          />
          <button onClick={handleCompare}>Compare</button>
        </div>
      )}

      {comparisonFoodInfo && (
        <div>
          <h2>Comparison Food Info</h2>
          {Object.keys(comparisonFoodInfo).map(key => (
            <p key={key}>{key}: {comparisonFoodInfo[key]}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodInfo;



// import React, { useState } from 'react';

// const FoodInfo = ({ onCompare }) => {
//   const [foodName, setFoodName] = useState('');
//   const [foodInfo, setFoodInfo] = useState(null);
//   const [comparisonFoodName, setComparisonFoodName] = useState('');
//   const [comparisonFoodInfo, setComparisonFoodInfo] = useState(null);

//   const sampleData = {
//     'apple': {
//       name: 'Apple',
//       calories: 95,
//       protein: 0.5,
//       vitamins: ['Vitamin C', 'Vitamin A'],
//     },
//     'banana': {
//       name: 'Banana',
//       calories: 105,
//       protein: 1.3,
//       vitamins: ['Vitamin C', 'Vitamin B6'],
//     },
//   };

//   const handleInputChange = (event) => {
//     setFoodName(event.target.value);
//   };

//   const handleComparisonInputChange = (event) => {
//     setComparisonFoodName(event.target.value);
//   };

//   const handleSubmit = () => {
//     const foodInfo = sampleData[foodName.toLowerCase()];
//     setFoodInfo(foodInfo);
//   };

//   const handleCompare = () => {
//     const comparisonInfo = sampleData[comparisonFoodName.toLowerCase()];
//     setComparisonFoodInfo(comparisonInfo);
//     onCompare(comparisonInfo);
//   };


//   return (
//     <div>
//       <input type="text" value={foodName} onChange={handleInputChange} />
//       <button onClick={handleSubmit}>Submit</button>
//       {foodInfo && (
//         <div>
//           <h2>{foodInfo.name}</h2>
//           <p>Calories: {foodInfo.calories}</p>
//           <p>Protein: {foodInfo.protein}</p>
//           <p>Vitamins: {foodInfo.vitamins.join(', ')}</p>
//           <input
//             type="text"
//             value={comparisonFoodName}
//             onChange={handleComparisonInputChange}
//           />
//           <button onClick={handleCompare}>Compare</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodInfo;
