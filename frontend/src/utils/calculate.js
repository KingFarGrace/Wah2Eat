// A function to calculate BMI (Body Mass Index)
const calculateBMI = (weight, height) => {
    // Check if weight or height is zero
    if (weight === 0 || height === 0) {
        return 0; // Return 0 if weight or height is zero to avoid division by zero
    }

    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI using the formula: weight / (heightInMeters * heightInMeters)
    const bmi = weight / (heightInMeters * heightInMeters);

    // Check if the calculated BMI is NaN (Not a Number) or not finite
    if (isNaN(bmi) || !isFinite(bmi)) {
        return 0; // Return 0 if the BMI is not a valid number
    }

    // Return the calculated BMI rounded to 2 decimal places
    return bmi.toFixed(2);
};

// Export the calculateBMI function as the named export of the module
export {
    calculateBMI
};
