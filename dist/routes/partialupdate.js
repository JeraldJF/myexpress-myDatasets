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
const schema_1 = __importDefault(require("../config/schema"));
const errors_1 = require("../helpers/errors");
const dates_1 = require("../config/dates");
const queries_1 = require("../config/queries");
const Connection_1 = __importDefault(require("../config/Connection"));
const connectDb = (req, res) => {
    const { error } = schema_1.default.validate(req.body, {
        abortEarly: false, //for datatype checking using joi schema
    });
    var dberror = {
        status: "ERROR",
        message: "Cannot add datasets",
    };
    try {
        var id = req.params["id"];
        if (error) {
            //wrong datatypes use
            res.status(422).json(errors_1.datatypes_error);
        }
        else {
            Connection_1.default.query(queries_1.selectid + `'${id}'=id`, (error, data) => {
                if (error)
                    res.status(500).json(dberror);
                else if (data.rowCount == 1) {
                    //given id present in datasets to update
                    var ds = req.body.data_schema || data.rows[0].data_schema;
                    var rc = req.body.router_config || data.rows[0].router_config;
                    var dataSchema = JSON.stringify(ds);
                    var routerConfig = JSON.stringify(rc);
                    var status1 = req.body.status || data.rows[0].status;
                    var createdBy = req.body.created_by || data.rows[0].created_by;
                    var updatedBy = req.body.updated_by || data.rows[0].updated_by;
                    Connection_1.default.query(queries_1.update +
                        `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${dates_1.createdDate}',updated_date='${dates_1.updatedDate}' WHERE id = '${id}';`, (err) => {
                        if (err) {
                            res.status(502).json(dberror);
                        }
                        else {
                            //update success
                            var detail = `datasets updated in the table successfully`;
                            var status = "SUCCESS";
                            const obj1 = {
                                status: `${status}`,
                                message: `${detail}`,
                            };
                            res.status(200).json(obj1);
                        }
                    });
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
        Connection_1.default.end;
    }
    catch (error) {
        res.status(500).json(dberror);
    }
};
exports.default = connectDb;
//# sourceMappingURL=partialupdate.js.map