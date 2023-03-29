
import config from "../config/config";
const { Pool } = require("pg");

var pool = new Pool(config);
pool.connect();

export default pool;