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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// import { Pool } from "pg";
const schema_1 = __importDefault(require("./schema"));
// import pool from "../../Config/Connection";
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const errors_1 = require("../helpers/errors");
const success_1 = require("../helpers/success");
const errors_2 = require("../helpers/errors");
const queries_1 = require("../config/queries");
const dates_1 = require("../config/dates");
const { Pool } = require("pg");
var pool = new Pool(config_1.default);
pool.connect();
function add() {
    (req, res) => __awaiter(this, void 0, void 0, function* () {
        var { error } = schema_1.default.validate(req.body, {
            abortEarly: false,
        });
        var dberror = {
            status: "ERROR",
            message: "Cannot add datasets",
        };
        try {
            var id = req.body.id;
            var ds = req.body.data_schema;
            var rc = req.body.router_config;
            var dataSchema = JSON.stringify(ds);
            var routerConfig = JSON.stringify(rc);
            var status1 = req.body.status;
            var createdBy = req.body.created_by;
            var updatedBy = req.body.updated_by;
            if (id) {
                //id provided to post
                pool.query(queries_1.selectid + `'${id}'=id;`, (err, result) => {
                    if (err) {
                        res.status(502).json(dberror);
                    }
                    else if (result.rowCount == 0) {
                        //no primary key voilation
                        if (error) {
                            //datatype checking
                            res.status(422).json(errors_1.datatypes_error);
                        }
                        else {
                            pool.query(queries_1.insertdata +
                                `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${dates_1.createdDate}', '${dates_1.updatedDate}');`, (error, data) => {
                                if (error)
                                    res.status(500).json(dberror);
                                else {
                                    res.status(200).json(success_1.inserted);
                                }
                            });
                        }
                    }
                    else {
                        //primary key voilation
                        var detail = `Datasets with Key (id)=(${id}) already exists`;
                        var errorStatus = "ERROR";
                        const obj1 = {
                            status: `${errorStatus}`,
                            message: `${detail}`,
                        };
                        res.status(409).json(obj1);
                    }
                });
            }
            else {
                // id not provided to post
                res.status(400).json(errors_2.nodatasets);
            }
            pool.end;
        }
        catch (error) {
            // Database error
            res.status(500).json(dberror);
            // console.log(error);
        }
    });
}
exports.default = pool;
// export default function(req: Request, res: Response){
//     // interface newObj {
//     //   id: string;
//     //   data_schema?: object;
//     //   router_config?: object;
//     //   status?: string;
//     //   created_by?: string;
//     //   updated_by?: string;
//     //   created_date?: Date;
//     //   updated_date?: Date;
//     // }
//     // interface dataObject {
//     //   body: newObj;
//     // }
//     const connectDb = async () => {
//       try {
//         const client = new Client({
//           user: "user1",
//           host: "localhost",
//           database: "datasets",
//           password: "JER@ALD",
//           port: 5432,
//         });
//         await client.connect();
//         var id = req.query.id;
//         const gotData = await client.query(
//           `SELECT * FROM datasets WHERE id='${id}'`
//         );
//         if (gotData.rowCount > 0)
//           res.send(gotData); //datasets with id available to display
//         else {
//           //datasets with id not available to display
//           var detail: string = `Key (id)=(${id}) does not exist.`;
//           var errorStatus: string = "ERROR";
//           const obj1 = {
//             status: `${errorStatus}`,
//             message: `${detail}`,
//           };
//           res.status(400).json(obj1);
//         }
//         await client.end();
//         return true;
//       } catch (error) {
//         // Database error
//         console.log(error);
//         const obj1 = {
//           status: "ERROR",
//           message: "Cannot Display Datasets",
//         };
//         res.status(500).json(obj1);
//       }
//     };
//     connectDb();
//   }
//# sourceMappingURL=testCon.js.map