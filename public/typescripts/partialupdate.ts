const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// import { Pool } from "pg";
import jsonSchema from "../../Config/schema";
import { nodatasets, datatypes_error } from "../../Helpers/errors";
import { createdDate, updatedDate } from "../../Config/dates";
import { update, selectid } from "../../Config/queries";
import pool from "../../Config/Connection";

const connectDb = (req: any, res: any) => {
  const { error } = jsonSchema.validate(req.body, {
    abortEarly: false, //for datatype checking using joi schema
  });
  var dberror = {
    status: "ERROR",
    message: "Cannot add datasets",
  };

  try {
    var id = req.params["id"];
    

    if (error) {
      //wrong datatypes use
      res.status(422).json(datatypes_error);
    } else {
      pool.query(selectid + `'${id}'=id`, (error: any, data: any) => {
        if (error) res.status(500).json(dberror);
        else if (data.rowCount == 1) {
          //given id present in datasets to update
          var ds = req.body.data_schema || data.rows[0].data_schema;
          var rc = req.body.router_config || data.rows[0].router_config;
          var dataSchema = JSON.stringify(ds);
          var routerConfig = JSON.stringify(rc);
          var status1: string = req.body.status || data.rows[0].status;

          var createdBy = req.body.created_by || data.rows[0].created_by;
          var updatedBy = req.body.updated_by || data.rows[0].updated_by;
          pool.query(
            update +
              `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${createdDate}',updated_date='${updatedDate}' WHERE id = '${id}';`,
            (err: any) => {
              if (err) {
                res.status(502).json(dberror);
              } else {
                //update success
                var detail: string = `datasets updated in the table successfully`;
                var status: string = "SUCCESS";
                const obj1 = {
                  status: `${status}`,
                  message: `${detail}`,
                };
                res.status(200).json(obj1);
              }
            }
          );
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
      });
    }
    pool.end;
  } catch (error) {
    res.status(500).json(dberror);

  }
};
export default connectDb;
