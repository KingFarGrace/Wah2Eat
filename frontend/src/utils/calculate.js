const calculateBMI = (weight, height) => {
    if (weight === 0 || height === 0) {
        return 0;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (isNaN(bmi) || !isFinite(bmi)) {
        return 0;
    }

    return bmi.toFixed(2);
};

export {
    calculateBMI
}
