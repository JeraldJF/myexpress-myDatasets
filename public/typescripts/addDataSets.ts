const express = require("express");
const app = express();
const bodyParser = require("body-parser");
import { Pool } from "pg";
import jsonSchema from "./schema";
// import {pool1} from "./Connection";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
import { datatypes_error } from "./errors";
import { inserted } from "./success";
import { nodatasets } from "./errors";
import { insertdata, selectid } from "./queries";
import { createdDate, updatedDate } from "./dates";

export default function (req: any, res: any) {
  const { error } = jsonSchema.validate(req.body, {
    abortEarly: false,
  });

  const connectDb = async () => {
    // var pool = pool1;
    // pool.connect();
    try {
      var pool = new Pool({
        user: "user1",
        host: "host.docker.internal",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });

      // host.docker.internal
      // if(pool.password=="JER@ALD"){ //Checking for password

      await pool.connect();
      var id = req.body.id;
      var ds = req.body.data_schema;
      var rc = req.body.router_config;
      var dataSchema = JSON.stringify(ds);
      var routerConfig = JSON.stringify(rc);
      var status1: string = req.body.status;

      var createdBy = req.body.created_by;
      var updatedBy = req.body.updated_by;


      var result = await pool.query(selectid + `'${id}'=id;`);




      if (!(Object.keys(req.body).length === 0)) {
        console.log("works");
        //datasets provided to post
        if (result.rowCount == 0) {
          console.log("works");
          //no primary key voilation
          if (error) {
            console.log("works");
            //datatype checking

            res.status(400).json(datatypes_error);
            // pool.end();
          } else {
            console.log("worksto");
            await pool.query(
              insertdata +
                `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}', '${updatedDate}');`
            );
            console.log("worksfina");
            res.status(200).json(inserted);
            // pool.end();
          }
        } else {
          //primary key voilation

          var detail: string = `Datasets with Key (id)=(${id}) already exists`;
          var errorStatus: string = "ERROR";
          const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };

          res.status(400).json(obj1);
          // pool.end();
        }
      } else {
        // datasets not provided to post
        res.status(400).json(nodatasets);
        // pool.end();
      }
      await pool.end();
      return true;
    } catch (error: any) {
      // Database error
      const obj1 = {
        status: "ERROR",
        message: "Cannot add datasets",
      };
      res.status(500).json(obj1);
      // console.log(error);
    }
  };
  connectDb();
}
