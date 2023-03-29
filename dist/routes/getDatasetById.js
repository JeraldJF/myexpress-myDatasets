"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Pool } from "pg";
const queries_1 = require("../helpers/queries");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection_1 = __importDefault(require("../helpers/connection"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var connectDb = (req, res) => {
    const dberror = {
        status: "ERROR",
        message: "Cannot Display Datasets",
    };
    try {
        var id = req.params["id"];
        const dataById = connection_1.default.query(queries_1.selectid + `id='${id}';`, (error, data) => {
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
        connection_1.default.end;
        // return true;
    }
    catch (error) {
        // Database error
        res.status(500).json(dberror);
    }
};
exports.default = connectDb;
//# sourceMappingURL=getDatasetById.js.map