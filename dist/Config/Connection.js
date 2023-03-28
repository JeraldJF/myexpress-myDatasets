"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const { Pool } = require("pg");
var pool = new Pool(config_1.default);
pool.connect();
exports.default = pool;
// env-cmd -f ./Config/dev.env
// host: "localhost" || process.env.HOST ,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//# sourceMappingURL=Connection.js.map