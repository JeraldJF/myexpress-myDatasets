"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// import { Pool } from "pg";
var Connection_1 = require("../../Config/Connection");
var schema_1 = require("../../Config/schema");
var errors_1 = require("../../Helpers/errors");
var dates_1 = require("../../Config/dates");
var queries_1 = require("../../Config/queries");
var connectDb = function (req, res) {
    var error = schema_1["default"].validate(req.body, {
        //for datatype checking using joi schema
        abortEarly: false
    }).error;
    var dberror = {
        status: "ERROR",
        message: "Cannot add datasets"
    };
    try {
        Connection_1["default"].connect;
        var id = req.params["id"];
        var ds = req.body.data_schema;
        var rc = req.body.router_config;
        var dataSchema = JSON.stringify(ds);
        var routerConfig = JSON.stringify(rc);
        var status1 = req.body.status;
        var createdBy = req.body.created_by;
        var updatedBy = req.body.updated_by;
        if (!(req.params === null)) {
            //datasets given to update
            if (error) {
                //wrong datatypes use
                return res.status(422).json(errors_1.datatypes_error);
            }
            else {
                Connection_1["default"].query(queries_1.update +
                    "data_schema='".concat(dataSchema, "', router_config='").concat(routerConfig, "', status='").concat(status1, "' ,created_by='").concat(createdBy, "', updated_by='").concat(updatedBy, "', created_date='").concat(dates_1.createdDate, "',updated_date='").concat(dates_1.updatedDate, "' WHERE id = '").concat(id, "';"), function (error, result) {
                    if (error) {
                        res.status(502).json(dberror);
                    }
                    else if (result.rowCount == 1) {
                        //given id present in datasets to update
                        var detail = "datasets updated in the table successfully";
                        var status = "SUCCESS";
                        var obj1 = {
                            status: "".concat(status),
                            message: "".concat(detail)
                        };
                        res.status(200).json(obj1);
                    }
                    else {
                        //datasets with key not available in database to update
                        var detail = "Datasets with Key (id)=(".concat(id, ") does not exist.");
                        var errorStatus = "ERROR";
                        var obj1 = {
                            status: "".concat(errorStatus),
                            message: "".concat(detail)
                        };
                        res.status(404).json(obj1);
                    }
                });
            }
        }
        else {
            //no datasets given
            res.status(404).json(errors_1.nodatasets);
        }
        Connection_1["default"].end;
    }
    catch (error) {
        // Database error
        res.status(500).json(dberror);
    }
};
exports["default"] = connectDb;
