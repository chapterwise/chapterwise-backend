const mongoose = require("mongoose");
const {CategoryModel} = require("./category.model");

export const SubCategoryModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    keyIndex : {
        type : Number,
        default : -1
    },
    categoryId : {
        type: CategoryModel,
        required : true
    }
})

module.exports = mongoose.model("subCategoryDB", SubCategoryModel);