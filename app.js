const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose');
const uri = "";

mongoose.connect(uri)
app.use(express.urlencoded({
    extended:true
}));

app.set('view engine','ejs')
app.use(cors());
app.use(express.json());

module.exports = app