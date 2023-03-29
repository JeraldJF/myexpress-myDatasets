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
//# sourceMappingURL=Connection.js.map