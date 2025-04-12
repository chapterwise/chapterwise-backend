const mongoose=require("mongoose");

const GenreModel = mongoose.Schema({
    subCategoryId : {
        type : String,
        required: true,
    },
    name : {
        type: String
    }
});

const genreDB = mongoose.model("genreDB", GenreModel);

module.exports = {
    GenreModel,
    genreDB
}