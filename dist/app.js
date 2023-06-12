"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
var app = express();
const port = 3006;
const src_1 = require("./helpers/src");
const src_2 = require("./helpers/src");
const src_3 = require("./helpers/src");
const src_4 = require("./helpers/src");
const src_5 = require("./helpers/src");
const src_6 = require("./helpers/src");
// import testCon from "./helpers/testCon";
app.use(express.json());
app.get("/datasets/get", src_1.get);
app.get("/datasets/id/:id", src_3.getbyid);
app.post("/datasets/addData", src_2.post);
app.put("/datasets/updateData/:id", src_4.fupdate);
app.patch("/datasets/patchData/:id", src_6.pupdate);
app.delete("/datasets/deleteData/:id", src_5.remove);
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