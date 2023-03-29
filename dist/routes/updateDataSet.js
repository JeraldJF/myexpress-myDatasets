"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// import { Pool } from "pg";
const connection_1 = __importDefault(require("../helpers/connection"));
const schema_1 = __importDefault(require("../helpers/schema"));
const errors_1 = require("../helpers/errors");
const dates_1 = require("../helpers/dates");
const queries_1 = require("../helpers/queries");
const connectDb = (req, res) => {
    const { error } = schema_1.default.validate(req.body, {
        //for datatype checking using joi schema
        abortEarly: false,
    });
    var dberror = {
        status: "ERROR",
        message: "Cannot add datasets",
    };
    try {
        connection_1.default.connect;
        var id = req.params["id"];
        var ds = req.body.data_schema;
        var rc = req.body.router_config;
        var dataSchema = JSON.stringify(ds);
        var routerConfig = JSON.stringify(rc);
        var status1 = req.body.status;
        var createdBy = req.body.created_by;
        var updatedBy = req.body.updated_by;
        if (error) {
            //wrong datatypes use
            return res.status(422).json(errors_1.datatypes_error);
        }
        else {
            connection_1.default.query(queries_1.update +
                `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${dates_1.createdDate}',updated_date='${dates_1.updatedDate}' WHERE id = '${id}';`, (error, result) => {
                if (error) {
                    res.status(502).json(dberror);
                }
                else if (result.rowCount == 1) {
                    //given id present in datasets to update
                    var detail = `datasets updated in the table successfully`;
                    var status = "SUCCESS";
                    const obj1 = {
                        status: `${status}`,
                        message: `${detail}`,
                    };
                    res.status(200).json(obj1);
                }
                else {
                    //datasets with key not available in database to update
                    var detail = `Datasets with Key (id)=(${id}) does not exist.`;
                    var errorStatus = "ERROR";
                    const obj1 = {
                        status: `${errorStatus}`,
                        message: `${detail}`,
                    };
                    res.status(404).json(obj1);
                }
            });
        }
        connection_1.default.end;
    }
    catch (error) {
        // Database error
        res.status(500).json(dberror);
    }
};
exports.default = connectDb;
//# sourceMappingURL=updateDataSet.js.map