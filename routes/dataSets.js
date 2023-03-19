"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = 3001;
var getDataSet_1 = require("../public/typescripts/getDataSet");
var addDataSets_1 = require("../public/typescripts/addDataSets");
var getDatasetById_1 = require("../public/typescripts/getDatasetById");
var updateDataSet_1 = require("../public/typescripts/updateDataSet");
var removeDataSet_1 = require("../public/typescripts/removeDataSet");
var partialupdate_1 = require("../public/typescripts/partialupdate");
app.use(express.json());
app.get("/datasets/get", getDataSet_1["default"]);
app.get("/datasets/id/:id", getDatasetById_1["default"]);
app.post("/datasets/addData", addDataSets_1["default"]);
app.put("/datasets/updateData/:id", updateDataSet_1["default"]);
app.patch("/datasets/updateStatus/:id", partialupdate_1["default"]);
app["delete"]("/datasets/deleteData/:id", removeDataSet_1["default"]);
app.all("*", function (req, res) {
    var route_error = {
        status: "ERROR",
        message: "Invalid route"
    };
    res.status(404).json(route_error);
});
app.listen(port, function (error) {
    if (error)
        console.log("error at port ".concat(port));
    else
        console.log("port number ".concat(port, " is working"));
});
module.exports = app;
