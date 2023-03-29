"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// import { Pool } from "pg";
const queries_1 = require("../config/queries");
const Connection_1 = __importDefault(require("../config/Connection"));
var connectDb = (req, res) => {
    const error = {
        status: "ERROR",
        message: "Cannot delete datasets",
    };
    try {
        var id = req.params["id"];
        Connection_1.default.query(queries_1.deleteid + `'${id}';`, (error, data) => {
            if (error) {
                //db error
                res.status(502).json(error);
            }
            else if (data.rowCount == 1) {
                //valid id to delete
                var detail = `datasets deleted from the table successfully`;
                var status = "SUCCESS";
                const obj1 = {
                    status: `${status}`,
                    message: `${detail}`,
                };
                res.status(200).json(obj1);
            }
            else {
                //datasets with key not available in database to update
                var detail = `Datasets with Key (id)=(${id}) does not exist. Cannot Delete`;
                var errorStatus = "ERROR";
                const obj1 = {
                    status: `${errorStatus}`,
                    message: `${detail}`,
                };
                res.status(404).json(obj1);
            }
        });
        Connection_1.default.end;
    }
    catch (error) {
        // Database error
        res.status(500).json(error);
    }
};
exports.default = connectDb;
//# sourceMappingURL=removeDataSet.js.map