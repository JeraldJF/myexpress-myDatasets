"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5432
});
exports["default"] = pool;
