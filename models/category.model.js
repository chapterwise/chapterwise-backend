const mongoose = require("mongoose");

const CategoryModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    keyIndex : {
        type : Number,
        default : -1
    }
})

const categoryDB = mongoose.model("categoryDB", CategoryModel);

module.exports = {
    CategoryModel,
    categoryDB
}