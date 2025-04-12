// VERSION 1 SERVER
// CHAPTERWISE


const express = require('express');
const session = require('express-session');
const expressWinston = require("express-winston");
const cors = require('cors')
const http = require('http')
require('dotenv').config()

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');

const uri = "mongodb+srv://chapterwise-admin:uESgWm9jIYZELqQ9@chapterwise-cluster.nvinu.mongodb.net/?retryWrites=true&w=majority";
// mongodb+srv://everidoor:dud1Vow6GdcbJiOL@molog.xqlwuxg.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(uri)
console.log("Connected to DB");


const { loggerConfig } = require('./logger');

const app = express();
app.use(cors());
app.set('view engine', 'ejs');

app.use(expressWinston.logger({
    ...loggerConfig,
    requestWhitelist: ['url', 'headers', 'method', 'query'],
    requestFilter: (req, propName) => {
        if (propName === 'headers') {
            return {
                'content-type': req.headers['content-type'],
                host: req.headers.host,
                'accept-encoding': req.headers['accept-encoding'],
                'content-length': req.headers['content-length']
            };
        }
        // For other properties, simply return them as is.
        return req[propName];
    }
}))

const dashboardRouter = require("./router/dashboard.router");
const userRouter = require("./router/user.router");


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(flash())

app.get("/", (req, res) => {
    res.status(200).json(`Health Check Successful`);
});

app.use("/v1/user", userRouter);

app.listen(process.env.PORT || 4000);

// const server = http.createServer(app)
// const port = process.env.PORT || 4000
// server.listen(port, () => {
//     console.log('Listening on port ' + port)
// });
