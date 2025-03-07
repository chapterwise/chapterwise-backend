const mongoose=require("mongoose");
const { HOMEADDRESS, FLATADDRESS, WORKADDRESS } = require("../utils/constants");

export const AddressModel = new mongoose.Schema({
    userId : {
        type : String,
        required: true
    },
    flat : {
        type : String,
        default : ""
    },
    area : {
        type: String,
        default : ""
    },
    pincode : {
        type : String,
        default : ""
    },
    type : {
        type : String,
        default : HOMEADDRESS,
        Options: [HOMEADDRESS, FLATADDRESS, WORKADDRESS]
    },
    latitude : {
        type : String,
        default: "0"
    },
    longitude : {
        type : String,
        default : "0"
    }
});

module.exports = mongoose.model('addressDB', AddressModel);