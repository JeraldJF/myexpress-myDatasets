const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
import { Pool } from "pg";
import jsonSchema from "./schema";
import { nodatasets,datatypes_error } from "./errors";
import { createdDate,updatedDate } from "./dates";
import { update,selectid } from "./queries";

//for datatype checking using joi schema

export default function (req: any, res: any) {
  const { error } = jsonSchema.validate(req.body, {
    abortEarly: false,
  });

  const connectDb = async () => {
    try {
      const pool = new Pool({
        user: "user1",
        host: "host.docker.internal",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });

      await pool.connect();
      var id = req.params['id'];
      var ds = req.body.data_schema;
      var rc = req.body.router_config;
      var dataSchema = JSON.stringify(ds);
      var routerConfig = JSON.stringify(rc);
      var status1: string = req.body.status;

      var createdBy = req.body.created_by;
      var updatedBy = req.body.updated_by;

      if (!(req.params===null)) {
        //datasets given to update

        if (error) { //wrong datatypes use
            return res.status(400).json(datatypes_error);
        } else {
          // const pkeyvoilate = await pool.query(
          //   selectid+`'${id}'=id`
          // );
          // if (pkeyvoilate.rowCount == 1) {
            //given id present in datasets to update

            const pkeyvoilate=await pool.query(
              update+`data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${createdDate}',updated_date='${updatedDate}' WHERE id = '${id}';`
            );
            if (pkeyvoilate.rowCount == 1) {

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
            res.status(400).json(obj1);
          }
        }
      } else {
        //no datasets given

        res.status(400).json(nodatasets);
        // console.log();
        
      }

      await pool.end();
      return true;
    } catch (error) {
      // Database error
      const obj1 = {
        status: "ERROR",
        message: "Cannot update datasets",
      };
      res.status(500).json(obj1);
    }
   
  };


  connectDb();
}

