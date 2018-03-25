"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressLogger = require("express-logger");
//const args = require("yargs");
const dbConnection = require('./config/dbConfig');
const dbWrapper = require('./models/dbWrapper');
const getNames = require("./apis/getnames");
console.log(new Date(), "Starting Application");

const app = express();

dbWrapper.init(dbConnection)
app.set("etag", false);
app.use(cors());
app.use(expressLogger({ "path": "/tmp/myApisLogs.log" }));
app.use(bodyParser.json());
app.use('/getnames/', getNames);

app.listen(4000, () => console.log("MyApp listening on port 4000!"));