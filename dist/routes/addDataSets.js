"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// import { Pool } from "pg";
const schema_1 = __importDefault(require("../helpers/schema"));
const connection_1 = __importDefault(require("../helpers/connection"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const errors_1 = require("../helpers/errors");
const success_1 = require("../helpers/success");
const errors_2 = require("../helpers/errors");
const queries_1 = require("../helpers/queries");
const dates_1 = require("../helpers/dates");
var connectDb = (req, res) => {
    var { error } = schema_1.default.validate(req.body, {
        abortEarly: false,
    });
    var dberror = {
        status: "ERROR",
        message: "Cannot add datasets",
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
            //id provided to post
            connection_1.default.query(queries_1.selectid + `'${id}'=id;`, (err, result) => {
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
                        connection_1.default.query(queries_1.insertdata +
                            `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${dates_1.createdDate}', '${dates_1.updatedDate}');`, (error, data) => {
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
                    var detail = `Datasets with Key (id)=(${id}) already exists`;
                    var errorStatus = "ERROR";
                    const obj1 = {
                        status: `${errorStatus}`,
                        message: `${detail}`,
                    };
                    res.status(409).json(obj1);
                }
            });
        }
        else {
            // id not provided to post
            res.status(400).json(errors_2.nodatasets);
        }
        connection_1.default.end;
    }
    catch (error) {
        // Database error
        res.status(500).json(dberror);
        // console.log(error);
    }
};
exports.default = connectDb;
//# sourceMappingURL=addDataSets.js.map