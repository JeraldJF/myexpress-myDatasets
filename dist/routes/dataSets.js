"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
var app = express();
const port = 3006;
const getDataSet_1 = __importDefault(require("../public/typescripts/getDataSet"));
const addDataSets_1 = __importDefault(require("../public/typescripts/addDataSets"));
const getDatasetById_1 = __importDefault(require("../public/typescripts/getDatasetById"));
const updateDataSet_1 = __importDefault(require("../public/typescripts/updateDataSet"));
const removeDataSet_1 = __importDefault(require("../public/typescripts/removeDataSet"));
const partialupdate_1 = __importDefault(require("../public/typescripts/partialupdate"));
app.use(express.json());
app.get("/datasets/get", getDataSet_1.default);
app.get("/datasets/id/:id", getDatasetById_1.default);
app.post("/datasets/addData", addDataSets_1.default);
app.put("/datasets/updateData/:id", updateDataSet_1.default);
app.patch("/datasets/patchData/:id", partialupdate_1.default);
app.delete("/datasets/deleteData/:id", removeDataSet_1.default);
app.all("*", (req, res) => {
    const route_error = {
        status: `ERROR`,
        message: `Invalid route`
    };
    res.status(404).json(route_error);
});
app.listen(port, (error) => {
    if (error)
        console.log(`error at port ${port}`);
    else
        console.log(`port number ${port} is working`);
});
module.exports = app;
//# sourceMappingURL=dataSets.js.map