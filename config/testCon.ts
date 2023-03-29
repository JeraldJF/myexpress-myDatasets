import config from "./config";
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// import { Pool } from "pg";
import jsonSchema from "./schema";
// import pool from "../../Config/Connection";
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
import { datatypes_error } from "../helpers/errors";
import { inserted } from "../helpers/success";
import { nodatasets } from "../helpers/errors";
import { insertdata, selectid } from "../config/queries";
import { createdDate, updatedDate } from "../config/dates";

const { Pool } = require("pg");

var pool = new Pool(config);
pool.connect();
function add(){
async(req: any, res: any) => {
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
}


export default pool;



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