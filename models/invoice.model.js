import { OrdersModel } from "./orders.model";

const mongoose = require("mongoose");


export const InvoiceModel = mongoose.Schema({
    orderId : {
        type : String
    },
    itemTotal : {
        type : Number,
        required: true
    },
    tax : {
        type : Number,
        required : true
    },
    delivery : {
        type : Number,
        default : 0
    },
    discount : {
        type : Number,
        default : 0,
    }
})

module.exports = mongoose.model("invoiceDB", InvoiceModel)