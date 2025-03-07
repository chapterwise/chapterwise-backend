const mongoose = require("mongoose");

export const CategoryModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    keyIndex : {
        type : Number,
        default : -1
    }
})

module.exports = mongoose.model("categoryDB", CategoryModel);