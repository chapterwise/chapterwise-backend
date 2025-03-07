import { InvoiceModel } from "./invoice.model";

const mongoose = require("mongoose");
const { BookModel } = require("./books.model");
const { AddressModel } = require("./address.model");


export const StatusModel = new mongoose.Schema({
    status : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        required : true
    }
})

export const OrdersModel = new mongoose.Schema({
    items: {
        type: [BookModel]
    },
    address: {
        type: [AddressModel]
    },
    bill : {
        type : InvoiceModel,
        required : true
    },
    status : {
        type : [StatusModel]
    }
});

module.exports = mongoose.model('ordersDB', OrdersModel);