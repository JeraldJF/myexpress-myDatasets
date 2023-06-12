"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.fupdate = exports.pupdate = exports.remove = exports.post = exports.getbyid = exports.get = void 0;
const config_1 = __importDefault(require("../config/config"));
const express = require("express");
const app = express();
const schema_1 = __importDefault(require("./schema"));
app.use(express.json());
const errors_1 = require("./errors");
const success_1 = require("./success");
const errors_2 = require("./errors");
const queries_1 = require("./queries");
const dates_1 = require("./dates");
const { Client } = require("pg");
var pool = new Client(config_1.default);
exports.pool = pool;
pool.connect();
// var get = async (req: any, res: any) => {
//   try {
//     let respond = await pool.query(select);
//     if (respond.rowCount == 1) {
//       // display datasets
//       res.status(200).send(respond.rows);
//     } else {
//       var detail: string = `Table is empty`;
//       var errorStatus: string = "ERROR";
//       const obj1 = {
//         status: `${errorStatus}`,
//         message: `${detail}`,
//       };
//       res.status(404).json(obj1);
//     }
//   } catch (error) {
//     if (error) res.status(500).json(database_error);
//   }
// };
var getbyid = async (req, res) => {
    try {
        var id = req.params["id"];
        const dataById = await pool.query(queries_1.selectid + `id='${id}';`);
        if (dataById.rowCount == 1)
            //datasets with id available to display
            res.send(dataById.rows);
        else {
            //datasets with id not available to display from the database
            var detail = `Key (id)=(${id}) does not exist.`;
            var errorStatus = "ERROR";
            const obj1 = {
                status: `${errorStatus}`,
                message: `${detail}`,
            };
            res.status(404).json(obj1);
        }
    }
    catch (error) {
        res.status(500).json(errors_2.database_error);
    }
};
exports.getbyid = getbyid;
var get = async (req, res) => {
    try {
        let respond = await pool.query(queries_1.select);
        if (respond.rowCount == 1) {
            // display datasets
            res.status(200).send(respond.rows);
        }
        else {
            var detail = `Table is empty`;
            var errorStatus = "ERROR";
            const obj1 = {
                status: `${errorStatus}`,
                message: `${detail}`,
            };
            res.status(404).json(obj1);
        }
    }
    catch (error) {
        if (error)
            res.status(500).json(errors_2.database_error);
    }
};
exports.get = get;
var remove = async (req, res) => {
    var id = req.params["id"];
    // try {
    var data = await pool.query(queries_1.deleteid + `'${id}';`);
    if (data.rowCount == 1) {
        //valid id to delete
        var detail = `datasets deleted from the table successfully`;
        var status = "SUCCESS";
        const obj1 = {
            status: `${status}`,
            message: `${detail}`,
        };
        res.status(200).json(obj1);
    }
    else {
        //datasets with key not available in database to update
        var detail = `Datasets with Key (id)=(${id}) does not exist. Cannot Delete`;
        var errorStatus = "ERROR";
        const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`,
        };
        res.status(404).json(obj1);
    }
    // } catch (error) {
    //   if (error) res.status(500).send(database_error);
    // }
};
exports.remove = remove;
var pupdate = async (req, res) => {
    const { error } = schema_1.default.validate(req.body, {
        abortEarly: false, //for datatype checking using joi schema
    });
    var id = req.params["id"];
    // try {
    var data = await pool.query(queries_1.selectid + `'${id}'=id`);
    var ds = req.body.data_schema || data.rows[0].data_schema;
    var rc = req.body.router_config || data.rows[0].router_config;
    var dataSchema = JSON.stringify(ds);
    var routerConfig = JSON.stringify(rc);
    var status1 = req.body.status || data.rows[0].status;
    var createdBy = req.body.created_by || data.rows[0].created_by;
    var updatedBy = req.body.updated_by || data.rows[0].updated_by;
    if (error) {
        //wrong datatypes use
        res.status(422).json(errors_1.datatypes_error);
    }
    else {
        //given id present in datasets to update
        if (data.rowCount == 1) {
            const patchdata = await pool.query(queries_1.update +
                `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${dates_1.createdDate}',updated_date='${dates_1.updatedDate}' WHERE id = '${id}';`);
            //update success
            var detail = `datasets updated in the table successfully`;
            var status = "SUCCESS";
            const obj1 = {
                status: `${status}`,
                message: `${detail}`,
            };
            res.status(200).json(obj1);
        }
        else {
            //datasets with key not available in database to update
            var detail = `Datasets with Key (id)=(${id}) does not exist.`;
            var errorStatus = "ERROR";
            const obj1 = {
                status: `${errorStatus}`,
                message: `${detail}`,
            };
            res.status(404).json(obj1);
        }
    }
    // } catch (error) {
    //   if (error) res.status(500).send(database_error);
    // }
};
exports.pupdate = pupdate;
var fupdate = async (req, res) => {
    const { error } = schema_1.default.validate(req.body, {
        //for datatype checking using joi schema
        abortEarly: false,
    });
    var id = req.params["id"];
    var ds = req.body.data_schema;
    var rc = req.body.router_config;
    var dataSchema = JSON.stringify(ds);
    var routerConfig = JSON.stringify(rc);
    var status1 = req.body.status;
    var createdBy = req.body.created_by;
    var updatedBy = req.body.updated_by;
    if (error) {
        //wrong datatypes use
        return res.status(422).json(errors_1.datatypes_error);
    }
    else {
        // try {
        var result = await pool.query(queries_1.update +
            `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${dates_1.createdDate}',updated_date='${dates_1.updatedDate}' WHERE id = '${id}';`);
        if (result.error) {
            res.status(500).json(errors_2.database_error);
        }
        else {
            if (result.rowCount == 1) {
                //given id present in datasets to update
                var detail = `datasets updated in the table successfully`;
                var status = "SUCCESS";
                const obj1 = {
                    status: `${status}`,
                    message: `${detail}`,
                };
                res.status(200).json(obj1);
            }
            else {
                //datasets with key not available in database to update
                var detail = `Datasets with Key (id)=(${id}) does not exist.`;
                var errorStatus = "ERROR";
                const obj1 = {
                    status: `${errorStatus}`,
                    message: `${detail}`,
                };
                res.status(404).json(obj1);
            }
        }
        // } catch (error) {
        //   if (error) res.status(500).send(database_error);
        // }
    }
};
exports.fupdate = fupdate;
var post = async (req, res) => {
    var id = req.body.id;
    var ds = req.body.data_schema;
    var rc = req.body.router_config;
    var dataSchema = JSON.stringify(ds);
    var routerConfig = JSON.stringify(rc);
    var status1 = req.body.status;
    var createdBy = req.body.created_by;
    var updatedBy = req.body.updated_by;
    var { error } = schema_1.default.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        //datatype checking
        res.status(422).json(errors_1.datatypes_error);
    }
    else {
        // try {
        const data = await pool.query(queries_1.insertdata +
            `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${dates_1.createdDate}', '${dates_1.updatedDate}') ON CONFLICT (id) 
          DO NOTHING;`);
        if (data.rowCount == 0) {
            var detail = `Datasets with Key (id)=(${id}) already exists`;
            var errorStatus = "ERROR";
            const obj1 = {
                status: `${errorStatus}`,
                message: `${detail}`,
            };
            res.status(409).send(obj1);
        }
        else {
            res.status(200).send(success_1.inserted);
        }
        // } catch (error) {
        //   if (error) res.status(500).send(database_error);
        // }
    }
};
exports.post = post;
//# sourceMappingURL=src.js.map