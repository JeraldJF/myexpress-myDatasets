const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// import { Pool } from "pg";
import jsonSchema from "../helpers/schema";
import pool from "../helpers/connection";
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
import { datatypes_error } from "../helpers/errors";
import { inserted } from "../helpers/success";
import { nodatasets } from "../helpers/errors";
import { insertdata, selectid } from "../helpers/queries";
import { createdDate, updatedDate } from "../helpers/dates";

var connectDb = (req: any, res: any) => {
  var { error } = jsonSchema.validate(req.body, {
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
    var status1: string = req.body.status;

    var createdBy = req.body.created_by;
    var updatedBy = req.body.updated_by;

    if (id) {
      //id provided to post
      pool.query(selectid + `'${id}'=id;`, (err: any, result: any) => {
        if (err) {
          res.status(502).json(dberror);
        } else if (result.rowCount == 0) {
          //no primary key voilation
          if (error) {
            //datatype checking

            res.status(422).json(datatypes_error);
          } else {
            pool.query(
              insertdata +
                `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}', '${updatedDate}');`,
              (error: any, data: any) => {
                if (error) res.status(500).json(dberror);
                else {
                  res.status(200).json(inserted);
                }
              }
            );
          }
        } else {
          //primary key voilation

          var detail: string = `Datasets with Key (id)=(${id}) already exists`;
          var errorStatus: string = "ERROR";
          const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };

          res.status(409).json(obj1);
        }
      });
    } else {
      // id not provided to post
      res.status(400).json(nodatasets);
    }
    pool.end;
  } catch (error: any) {
    // Database error
    res.status(500).json(dberror);
    // console.log(error);
  }
};

export default connectDb;
