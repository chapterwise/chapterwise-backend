const mongoose=require("mongoose");

const PopularityModel = new mongoose.Schema({
    sku : {
        type : String,
        required: true
    },
    orders : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('popularityDB', PopularityModel);