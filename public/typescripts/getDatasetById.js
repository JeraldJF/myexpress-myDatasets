"use strict";
exports.__esModule = true;
// import { Pool } from "pg";
var queries_1 = require("./queries");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var Connection_1 = require("./Connection");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var connectDb = function (req, res) {
    try {
        Connection_1["default"].connect;
        var id = req.params["id"];
        if (id) {
            //User provided id to retreive datasets
            var dataById = Connection_1["default"].query(queries_1.selectid + "id='".concat(id, "';"), function (error, data) {
                if (data.rowCount == 1)
                    //datasets with id available to display
                    res.send(data.rows);
                else {
                    //datasets with id not available to display from the database
                    var detail = "Key (id)=(".concat(id, ") does not exist.");
                    var errorStatus = "ERROR";
                    var obj1 = {
                        status: "".concat(errorStatus),
                        message: "".concat(detail)
                    };
                    res.status(400).json(obj1);
                }
            });
        }
        else {
            //id not provided by the user
            var detail = "Id is undefined. Cannot retrieve datasets";
            var errorStatus = "ERROR";
            var obj1 = {
                status: "".concat(errorStatus),
                message: "".concat(detail)
            };
            res.status(400).json(obj1);
        }
        Connection_1["default"].end;
        // return true;
    }
    catch (error) {
        // Database error
        console.log(error);
        var obj1 = {
            status: "ERROR",
            message: "Cannot Display Datasets"
        };
        res.status(500).json(obj1);
    }
};
exports["default"] = connectDb;
