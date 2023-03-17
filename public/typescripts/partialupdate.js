"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var pg_1 = require("pg");
var schema_1 = require("./schema");
var errors_1 = require("./errors");
var dates_1 = require("./dates");
var queries_1 = require("./queries");
//for datatype checking using joi schema
function default_1(req, res) {
    var _this = this;
    var error = schema_1["default"].validate(req.body, {
        abortEarly: false
    }).error;
    var connectDb = function () { return __awaiter(_this, void 0, void 0, function () {
        var pool, id, data, pkeyvoilate, ds, rc, dataSchema, routerConfig, status1, createdBy, updatedBy, detail, status, obj1, detail, errorStatus, obj1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    pool = new pg_1.Pool({
                        user: "user1",
                        host: "localhost",
                        database: "datasets",
                        password: "JER@ALD",
                        port: 5432
                    });
                    ;
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    id = req.params['id'];
                    return [4 /*yield*/, pool.query(queries_1.selectid + "'".concat(id, "'=id"))];
                case 2:
                    data = _a.sent();
                    if (!error) return [3 /*break*/, 3];
                    // var detail: string = error.details[0].message;
                    // var detail: string = "datatypes of datasets are incorrect";
                    //   var Status: string = "ERROR";
                    //   const obj1: { status: string; message: string } = {
                    //     status: `${Status}`,
                    //     message: `${detail}`,
                    //   };
                    return [2 /*return*/, res.status(400).json(errors_1.datatypes_error)];
                case 3: return [4 /*yield*/, pool.query(queries_1.selectid + "'".concat(id, "'=id"))];
                case 4:
                    pkeyvoilate = _a.sent();
                    if (!(pkeyvoilate.rowCount == 1)) return [3 /*break*/, 6];
                    ds = req.body.data_schema || data.rows[0].data_schema;
                    rc = req.body.router_config || data.rows[0].router_config;
                    dataSchema = JSON.stringify(ds);
                    routerConfig = JSON.stringify(rc);
                    status1 = req.body.status || data.rows[0].status;
                    createdBy = req.body.created_by || data.rows[0].created_by;
                    updatedBy = req.body.updated_by || data.rows[0].updated_by;
                    return [4 /*yield*/, pool.query(queries_1.update + "data_schema='".concat(dataSchema, "', router_config='").concat(routerConfig, "', status='").concat(status1, "' ,created_by='").concat(createdBy, "', updated_by='").concat(updatedBy, "', created_date='").concat(dates_1.createdDate, "',updated_date='").concat(dates_1.updatedDate, "' WHERE id = '").concat(id, "';"))];
                case 5:
                    _a.sent();
                    detail = "datasets updated in the table successfully";
                    status = "SUCCESS";
                    obj1 = {
                        status: "".concat(status),
                        message: "".concat(detail)
                    };
                    res.status(200).json(obj1);
                    return [3 /*break*/, 7];
                case 6:
                    detail = "Datasets with Key (id)=(".concat(id, ") does not exist.");
                    errorStatus = "ERROR";
                    obj1 = {
                        status: "".concat(errorStatus),
                        message: "".concat(detail)
                    };
                    res.status(400).json(obj1);
                    _a.label = 7;
                case 7: 
                // } else {
                //   //no datasets given
                //   res.status(400).json(nodatasets);
                //   // console.log();
                // }
                return [4 /*yield*/, pool.end()];
                case 8:
                    // } else {
                    //   //no datasets given
                    //   res.status(400).json(nodatasets);
                    //   // console.log();
                    // }
                    _a.sent();
                    return [2 /*return*/, true];
                case 9:
                    error_1 = _a.sent();
                    // Database error
                    // const obj1 = {
                    //   status: "ERROR",
                    //   message: "Cannot update datasets",
                    // };
                    // res.status(500).json(obj1);
                    console.log(error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    connectDb();
}
exports["default"] = default_1;
