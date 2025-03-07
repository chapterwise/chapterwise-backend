const mongoose=require("mongoose");
const { adminRoleConst, userRoleConst } = require("../utils/constants");

const UserProfileModel = new mongoose.Schema({
    email : {
        type : String,
        default : ""
    },
    password : {
        type: String,
        default : ""
    },
    mobile : {
        type : Number,
        required: true
    },
    role: {
        type : String,
        required: true,
        default : userRoleConst,
        Options : [userRoleConst, adminRoleConst]
    }
});

module.exports = mongoose.model('userDB', UserProfileModel);