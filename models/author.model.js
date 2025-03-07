const mongoose=require("mongoose");

export const AuthorModel = new mongoose.Schema({
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

module.exports = mongoose.model('authorDB', AuthorModel);