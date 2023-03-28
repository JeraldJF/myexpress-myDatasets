"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
};
exports.default = configure;
//# sourceMappingURL=config.js.map