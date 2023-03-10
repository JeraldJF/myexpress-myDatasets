
import { Request, Response } from "express";
import pool1 from "./Connection";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function(req: Request, res: Response){
    // interface newObj {
    //   id: string;
    //   data_schema?: object;
    //   router_config?: object;
    //   status?: string;
    //   created_by?: string;
    //   updated_by?: string;
    //   created_date?: Date;
    //   updated_date?: Date;
    // }
    // interface dataObject {
    //   body: newObj;
    // }
    
  
    const connectDb = async () => {
      try {
        const pool = pool1;
        await pool.connect();
        var id = req.query.id;
        var Nid=Number(id);

        if(Nid){ //User provided id to retreive datasets
        const dataById = await pool.query(
          `SELECT * FROM datasets WHERE id='${id}'`
        );
  
        if (dataById.rowCount > 0) //datasets with id available to display
          res.send(dataById); 
        else {
          //datasets with id not available to display from the database
          var detail: string = `Key (id)=(${id}) does not exist.`;
          var errorStatus: string = "ERROR";
          const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };
          res.status(400).json(obj1);
        }
      }
      else{ //id not provided by the user
        var detail: string = `Datasets with Key (id)=(${id}) does not exist. Cannot retrieve datasets`;
            var errorStatus: string = "ERROR";
            const obj1 = {
              status: `${errorStatus}`,
              message: `${detail}`,
            };
            res.status(400).json(obj1);

      }
        await pool.end();
        return true;
      } catch (error) {
        // Database error
        console.log(error);
        const obj1 = {
          status: "ERROR",
          message: "Cannot Display Datasets",
        };
        res.status(500).json(obj1);
      }
    };
    connectDb();
  }