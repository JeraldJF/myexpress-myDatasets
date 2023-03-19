"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// import { Pool } from "pg";
var queries_1 = require("../../Config/queries");
var Connection_1 = require("../../Config/Connection");
var connectDb = function (req, res) {
    var error = {
        status: "ERROR",
        message: "Cannot delete datasets"
    };
    try {
        var id = req.params['id'];
        if (id) {
            //id given to delete
            Connection_1["default"].query(queries_1.deleteid + "'".concat(id, "';"), function (error, data) {
                if (error) { //db error
                    res.status(502).json(error);
                }
                else if (data.rowCount == 1) {
                    //valid id to delete
                    var detail = "datasets deleted from the table successfully";
                    var status = "SUCCESS";
                    var obj1 = {
                        status: "".concat(status),
                        message: "".concat(detail)
                    };
                    res.status(200).json(obj1);
                }
                else {
                    //datasets with key not available in database to update
                    var detail = "Datasets with Key (id)=(".concat(id, ") does not exist. Cannot Delete");
                    var errorStatus = "ERROR";
                    var obj1 = {
                        status: "".concat(errorStatus),
                        message: "".concat(detail)
                    };
                    res.status(404).json(obj1);
                }
            });
        }
        else {
            //no datasets given
            var status_1 = "Error";
            var message = "No inputs given for deletion";
            var objmessage = {
                status: "".concat(status_1),
                message: "".concat(message)
            };
            res.status(400).json(objmessage);
        }
        Connection_1["default"].end;
    }
    catch (error) {
        // Database error
        res.status(500).json(error);
    }
};
exports["default"] = connectDb;
