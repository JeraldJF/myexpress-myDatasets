"use strict";
exports.__esModule = true;
exports.pool1 = void 0;
var pg_1 = require("pg");
exports.pool1 = new pg_1.Client({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5432
});
