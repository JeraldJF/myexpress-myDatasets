"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = 3001;
var getDataSet_1 = require("./getDataSet");
var addDataSets_1 = require("./addDataSets");
var getDatasetById_1 = require("./getDatasetById");
var updateDataSet_1 = require("./updateDataSet");
var removeDataSet_1 = require("./removeDataSet");
// import imports from "./public/typescripts/imports";
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/dataset/get", getDataSet_1["default"]);
app.get("/dataset/getById", getDatasetById_1["default"]);
app.post("/dataset/create", addDataSets_1["default"]);
app.put("/dataset/updateData", updateDataSet_1["default"]);
app["delete"]("/dataset/removeData", removeDataSet_1["default"]);
app.listen(port, function (error) {
    if (error)
        console.log("error at port ".concat(port));
    else
        console.log("port number ".concat(port, " is working"));
});
module.exports = app;
