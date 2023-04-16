var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();

const URI_MONGODB = process.env.DATABASE_URL;

var app = express();

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

const PORT = process.env.PORT || 8000;
const DOMAIN = process.env.DOMAIN_NAME ? process.env.DOMAIN_NAME : 'localhost:' + PORT;

app.listen(PORT, () => {
    console.log(`Server started on ${DOMAIN}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    index: false
}));
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// router
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
    .connect(URI_MONGODB, {
        useNewUrlParser: true,
    })
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log("error connection to mongo db", err));

module.exports = app;
