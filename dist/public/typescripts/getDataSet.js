"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = __importDefault(require("../../Config/Connection"));
const queries_1 = require("../../Config/queries");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var connectDB = (req, res) => {
    try {
        Connection_1.default.query(queries_1.select, (error, data) => {
            if (data.rowCount > 0) {
                // display datasets
                res.send(data.rows);
            }
            else {
                //No data in table to display
                var detail = `Table is empty`;
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
        console.log(error);
        const obj1 = {
            status: "ERROR",
            message: "Cannot Display Datasets",
        };
        res.status(500).json(error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=getDataSet.js.map