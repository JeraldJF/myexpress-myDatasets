"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config();
const express = require('express');
var app = express();
const port = 3006;
const testCon_1 = require("./helpers/testCon");
const testCon_2 = require("./helpers/testCon");
const testCon_3 = require("./helpers/testCon");
const testCon_4 = require("./helpers/testCon");
const testCon_5 = require("./helpers/testCon");
const testCon_6 = require("./helpers/testCon");
// import testCon from "./helpers/testCon";
app.use(express.json());
app.get("/datasets/get", testCon_1.get);
app.get("/datasets/id/:id", testCon_3.getbyid);
app.post("/datasets/addData", testCon_2.post);
app.put("/datasets/updateData/:id", testCon_4.fupdate);
app.patch("/datasets/patchData/:id", testCon_6.pupdate);
app.delete("/datasets/deleteData/:id", testCon_5.remove);
app.all("*", (req, res) => {
    const route_error = {
        status: `ERROR`,
        message: `Invalid route`
    };
    res.status(404).json(route_error);
});
app.listen(port, (error) => {
    console.log(`port number ${port} is working`);
});
// module.exports=app;
exports.default = app;
//# sourceMappingURL=app.js.map