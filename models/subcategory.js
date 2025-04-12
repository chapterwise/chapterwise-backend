const mongoose = require("mongoose");

const SubCategoryModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    keyIndex : {
        type : Number,
        default : -1
    },
    categoryId : {
        type: String,
        required : true
    }
});

const subCategoryDB = mongoose.model("subCategoryDB", SubCategoryModel);

module.exports = {
    SubCategoryModel,
    subCategoryDB
}