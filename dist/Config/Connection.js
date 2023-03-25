"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
var pool = new Pool({
    user: "user1",
    host: "host.docker.internal",
    database: "datasets",
    password: "JER@ALD",
    port: 5432,
});
pool.connect();
exports.default = pool;
// env-cmd -f ./Config/dev.env 
// host: "localhost" || process.env.HOST ,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//# sourceMappingURL=Connection.js.map