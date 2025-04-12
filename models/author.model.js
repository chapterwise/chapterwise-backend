const mongoose=require("mongoose");

const AuthorModel = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    penName : {
        type : String,
        default : ""
    },
    Origin : {
        type : String,
        default : ""
    }
})

const authorDB = mongoose.model('authorDB', AuthorModel);

module.exports = {
    AuthorModel,
    authorDB
};