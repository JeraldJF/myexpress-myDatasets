"use strict";
exports.__esModule = true;
var Connection_1 = require("./Connection");
var queries_1 = require("./queries");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var connectDB = function (req, res) {
    try {
        Connection_1["default"].connect;
        Connection_1["default"].query(queries_1.select, function (error, data) {
            if (data.rowCount > 0) {
                // display datasets
                res.send(data.rows);
            }
            else {
                //No data in table to display
                var detail = "Table is empty";
                var errorStatus = "ERROR";
                var obj1 = {
                    status: "".concat(errorStatus),
                    message: "".concat(detail)
                };
                res.status(400).json(obj1);
            }
        });
        Connection_1["default"].end;
    }
    catch (error) {
        // Database error
        console.log(error);
        var obj1 = {
            status: "ERROR",
            message: "Cannot Display Datasets"
        };
        res.status(500).json(error);
    }
};
exports["default"] = connectDB;
