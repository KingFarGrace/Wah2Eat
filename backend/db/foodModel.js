const mongoose = require('./index')

const foodSchema = mongoose.Schema({
    FoodName: String,
    WATER: Number,
    TOTNIT: Number,
    PROT: Number,
    FAT: Number,
    CHO: Number,
    KCALS: Number,
    KJ: Number,
    STAR: Number,
    OLIGO: Number,
    TOTSUG: Number,
    GLUC: Number,
    GALACT: Number,
    FRUCT: Number,
    SUCR: Number,
    MALT: Number,
    LACT: Number,
    ALCO: Number,
    ENGFIB: Number,
    AOACFIB: Number,
    SATFOD: Number,
    MONOFODc: Number,
    MONOFOD: Number,
    POLYFODc: Number,
    POLYFOD: Number,
    CHOL: Number,
    NA: Number,
    K: Number,
    CA: Number,
    MG: Number,
    P: Number,
    FE: Number,
    CU: Number,
    ZN: Number,
    CL: Number,
    MN: Number,
    SE: Number,
    I: Number,
    RET: Number,
    CAREQU: Number,
    RETEQU: Number,
    VITD: Number,
    VITE: Number,
    VITK1: Number,
    THIA: Number,
    RIBO: Number,
    NIAC: Number,
    TRYP60: Number,
    NIACEQU: Number,
    VITB6: Number,
    VITB12: Number,
    FOLT: Number,
    PANTO: Number,
    BIOT: Number,
    VITC: Number
})

module.exports.foodModel = mongoose.model('food_nutri', foodSchema, 'food_nutri')