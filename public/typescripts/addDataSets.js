"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
// const bodyParser = require("body-parser");
// import { Pool } from "pg";
var schema_1 = require("../../Config/schema");
var Connection_1 = require("../../Config/Connection");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var errors_1 = require("../../Helpers/errors");
var success_1 = require("../../Helpers/success");
var errors_2 = require("../../Helpers/errors");
var queries_1 = require("../../Config/queries");
var dates_1 = require("../../Config/dates");
var connectDb = function (req, res) {
    var error = schema_1["default"].validate(req.body, {
        abortEarly: false
    }).error;
    var dberror = {
        status: "ERROR",
        message: "Cannot add datasets"
    };
    try {
        var id = req.body.id;
        var ds = req.body.data_schema;
        var rc = req.body.router_config;
        var dataSchema = JSON.stringify(ds);
        var routerConfig = JSON.stringify(rc);
        var status1 = req.body.status;
        var createdBy = req.body.created_by;
        var updatedBy = req.body.updated_by;
        if (id) {
            //datasets provided to post
            Connection_1["default"].query(queries_1.selectid + "'".concat(id, "'=id;"), function (err, result) {
                if (err) {
                    res.status(502).json(dberror);
                }
                else if (result.rowCount == 0) {
                    //no primary key voilation
                    if (error) {
                        //datatype checking
                        res.status(422).json(errors_1.datatypes_error);
                    }
                    else {
                        Connection_1["default"].query(queries_1.insertdata +
                            "(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('".concat(id, "', '").concat(dataSchema, "', '").concat(routerConfig, "', '").concat(status1, "', '").concat(createdBy, "', '").concat(updatedBy, "', '").concat(dates_1.createdDate, "', '").concat(dates_1.updatedDate, "');"), function (error, data) {
                            if (error)
                                res.status(500).json(dberror);
                            else {
                                res.status(200).json(success_1.inserted);
                            }
                        });
                    }
                }
                else {
                    //primary key voilation
                    var detail = "Datasets with Key (id)=(".concat(id, ") already exists");
                    var errorStatus = "ERROR";
                    var obj1 = {
                        status: "".concat(errorStatus),
                        message: "".concat(detail)
                    };
                    res.status(409).json(obj1);
                }
            });
        }
        else {
            // datasets not provided to post
            res.status(500).json(errors_2.nodatasets);
        }
        Connection_1["default"].end;
    }
    catch (error) {
        // Database error
        res.status(500).json(dberror);
        // console.log(error);
    }
};
exports["default"] = connectDb;
