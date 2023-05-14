const planModel = require('../db/planModel').planModel
const rtnFailedJson = require('../utils/jsonUtil').rtnFailedJson
const rtnSuccessJson = require('../utils/jsonUtil').rtnSuccessJson

function setPlan(req, res) {
    var body = req.body
    planModel.create({
        email: body.email,
        aimType: body.aimType,
        aimWeight: body.aimWeight,
        periodLength: body.periodLength,
        stime: new Date()
    }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
    })
    return rtnSuccessJson(res, 'Successfully set a plan.')
}

function getPlan(req, res) {
    var query = req.query
    planModel.findOne({ email: query.email }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data === null) rtnFailedJson(res, 'Failed to find diet plan.')
        var plan = makePlan(data.aimType, data.aimWeight, data.periodLength, data.stime)
        rtnSuccessJson(res, 'Here is your plan.', plan)
    })
}

/**
 * Return a plan object.
 * Structure of plan:[{ date, nutriReq: { xx, xx, ... } }, ...]
 * @param {String} aimType 
 * @param {Number} aimWeight 
 * @param {Number} periodLength 
 * @param {Date} stime
 */
function makePlan(aimType, aimWeight, periodLength, stime, age, gender, height, weight, activityLevel) {
    var plan = [];
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  
    // TODO: Calculate BMR based on age, gender, height, and weight.
    var BMR = calculateBMR(age, gender, height, weight);
  
    // TODO: Adjust BMR based on activity level.
    var dailyCalories = adjustBMRForActivityLevel(BMR, activityLevel);
  
    var dailyProtein, dailyCarbs, dailyFat;
    switch(aimType) {
        case 'gain':
            dailyProtein = dailyCalories * 0.35;
            dailyCarbs = dailyCalories * 0.5;
            dailyFat = dailyCalories * 0.15;
            break;
        case 'lose':
            dailyProtein = dailyCalories * 0.4;
            dailyCarbs = dailyCalories * 0.4;
            dailyFat = dailyCalories * 0.2;
            break;
        default:  // healthy eating
            dailyProtein = dailyCalories * 0.15;
            dailyCarbs = dailyCalories * 0.55;
            dailyFat = dailyCalories * 0.3;
    }
  
    for (var i = 0; i < periodLength; i++) {
        var currentDay = new Date(stime.getTime() + i * oneDay);
  
        var nutritionRequirement = {
            protein: dailyProtein,
            carbs: dailyCarbs,
            fat: dailyFat
        };
  
        var dayPlan = { 
            date: currentDay, 
            nutriReq: nutritionRequirement 
        };
  
        plan.push(dayPlan);
    }
  
    return plan;
  }
  /**
   * Calculate BMR (Basal Metabolic Rate) using the Mifflin-St Jeor equation.
   * @param {Number} age 
   * @param {String} gender 
   * @param {Number} height 
   * @param {Number} weight 
   */
  function calculateBMR(age, gender, height, weight) {
    var BMR;
  
    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    return BMR;
  }
  
  /**
  * Adjust BMR based on activity level using the Harris-Benedict equation.
  * @param {Number} BMR 
  * @param {String} activityLevel 
  */
  function adjustBMRForActivityLevel(BMR, activityLevel) {
    var adjustedBMR;
  
    switch (activityLevel) {
        case 'sedentary':
            adjustedBMR = BMR * 1.2;
            break;
        case 'light':
            adjustedBMR = BMR * 1.375;
            break;
        case 'moderate':
            adjustedBMR = BMR * 1.55;
            break;
        case 'active':
            adjustedBMR = BMR * 1.725;
            break;
        case 'very active':
            adjustedBMR = BMR * 1.9;
            break;
    }
  
    return adjustedBMR;
  }
  
  
  module.exports.setPlan = setPlan
  module.exports.getPlan = getPlan
  module.exports.getPlan = makePlan