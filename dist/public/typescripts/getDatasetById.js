"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Pool } from "pg";
const queries_1 = require("../../Config/queries");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Connection_1 = __importDefault(require("../../Config/Connection"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var connectDb = (req, res) => {
    const dberror = {
        status: "ERROR",
        message: "Cannot Display Datasets",
    };
    try {
        var id = req.params["id"];
        if (id) {
            //User provided id to retreive datasets
            const dataById = Connection_1.default.query(queries_1.selectid + `id='${id}';`, (error, data) => {
                if (error) {
                    res.status(502).json(dberror);
                }
                if (data.rowCount == 1)
                    //datasets with id available to display
                    res.send(data.rows);
                else {
                    //datasets with id not available to display from the database
                    var detail = `Key (id)=(${id}) does not exist.`;
                    var errorStatus = "ERROR";
                    const obj1 = {
                        status: `${errorStatus}`,
                        message: `${detail}`,
                    };
                    res.status(404).json(obj1);
                }
            });
        }
        else {
            //id not provided by the user
            var detail = `Id is undefined. Cannot retrieve datasets`;
            var errorStatus = "ERROR";
            const obj1 = {
                status: `${errorStatus}`,
                message: `${detail}`,
            };
            res.status(400).json(obj1);
        }
        Connection_1.default.end;
        // return true;
    }
    catch (error) {
        // Database error
        res.status(500).json(dberror);
    }
};
exports.default = connectDb;
//# sourceMappingURL=getDatasetById.js.map