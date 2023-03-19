const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// import { Pool } from "pg";
import { deleteid } from "./queries";
import pool from "./Connection";



  var connectDb = (req: any, res: any) => {
    const error = {
      status: "ERROR",
      message: "Cannot delete datasets",
    };
    try {
      

      pool.connect();
      var id = req.params['id'];

      
      if (id) {
        //id given to delete
        pool.query(deleteid+`'${id}';`,(error:any,data:any)=>{
          if(error){//db error
            res.status(502).json(error);
          }
          else if (data.rowCount == 1) {
            //valid id to delete
  
            var detail: string = `datasets deleted from the table successfully`;
            var status: string = "SUCCESS";
  
            const obj1 = {
              status: `${status}`,
              message: `${detail}`,
            };
  
            res.status(200).json(obj1);
          } else {
            //datasets with key not available in database to update
            var detail: string = `Datasets with Key (id)=(${id}) does not exist. Cannot Delete`;
            var errorStatus: string = "ERROR";
            const obj1 = {
              status: `${errorStatus}`,
              message: `${detail}`,
            };
            res.status(400).json(obj1);
          }
        });

        
      } else {
        //no datasets given
        const status: string = "Error";
        const message: string = "No inputs given for deletion";
        const objmessage: object = {
          status: `${status}`,
          message: `${message}`,
        };
        res.status(400).json(objmessage);
      }

      pool.end;
    } catch (error) {
      // Database error
      res.status(500).json(error);
    }
  };
export default connectDb;
