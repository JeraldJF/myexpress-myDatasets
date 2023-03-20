"use strict";
exports.__esModule = true;
var Pool = require('pg').Pool;
var pool = new Pool({
    user: "user1",
    host: "host.docker.internal",
    database: "datasets",
    password: "JER@ALD",
    port: 5432
});
pool.connect();
exports["default"] = pool;
