require('dotenv').config();
import config from "./config";

const { Pool } = require("pg");

var pool = new Pool(config);
pool.connect();

export default pool;

// env-cmd -f ./Config/dev.env
// host: "localhost" || process.env.HOST ,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
