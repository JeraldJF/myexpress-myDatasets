const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// import { Pool } from "pg";
import pool from "../helpers/connection";
import jsonSchema from "../helpers/schema";
import { nodatasets, datatypes_error } from "../helpers/errors";
import { createdDate, updatedDate } from "../helpers/dates";
import { update, selectid } from "../helpers/queries";

const connectDb = (req: any, res: any) => {
  const { error } = jsonSchema.validate(req.body, {
    //for datatype checking using joi schema
    abortEarly: false,
  });
  var dberror = {
    status: "ERROR",
    message: "Cannot add datasets",
  };
  try {
    pool.connect;
    var id = req.params["id"];
    var ds = req.body.data_schema;
    var rc = req.body.router_config;
    var dataSchema = JSON.stringify(ds);
    var routerConfig = JSON.stringify(rc);
    var status1: string = req.body.status;

    var createdBy = req.body.created_by;
    var updatedBy = req.body.updated_by;

    if (error) {
      //wrong datatypes use
      return res.status(422).json(datatypes_error);
    } else {
      pool.query(
        update +
          `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${createdDate}',updated_date='${updatedDate}' WHERE id = '${id}';`,
        (error: any, result: any) => {
          if (error) {
            res.status(502).json(dberror);
          } else if (result.rowCount == 1) {
            //given id present in datasets to update
            var detail: string = `datasets updated in the table successfully`;
            var status: string = "SUCCESS";
            const obj1 = {
              status: `${status}`,
              message: `${detail}`,
            };

            res.status(200).json(obj1);
          } else {
            //datasets with key not available in database to update
            var detail: string = `Datasets with Key (id)=(${id}) does not exist.`;
            var errorStatus: string = "ERROR";
            const obj1 = {
              status: `${errorStatus}`,
              message: `${detail}`,
            };
            res.status(404).json(obj1);
          }
        }
      );
    }

    pool.end;
  } catch (error) {
    // Database error
    res.status(500).json(dberror);
  }
};

export default connectDb;
