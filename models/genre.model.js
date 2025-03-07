const mongoose=require("mongoose");
const {CategoryModel} = require("./category.model");
const { SubCategoryModel } = require("./subcategory");

export const GenreModel = mongoose.Schema({
    category : {
        type : CategoryModel
    },
    subCategory : {
        type : SubCategoryModel
    },
    name : {
        type: String
    }
});

module.exports = mongoose.model("genreDB", GenreModel);