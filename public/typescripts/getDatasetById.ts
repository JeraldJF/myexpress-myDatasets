import { Request, Response } from "express";
// import { Pool } from "pg";
import { selectid } from "../../Config/queries";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
import pool from "../../Config/Connection";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var connectDb = (req: Request, res: Response) => {
  const dberror= {
    status: "ERROR",
    message: "Cannot Display Datasets",
  };
  try {
  
    var id = req.params["id"];

    if (id) {
      //User provided id to retreive datasets
      const dataById = pool.query(
        selectid + `id='${id}';`,
        (error: any, data: any) => {
          if(error){
            res.status(502).json(dberror);
          }
          if (data.rowCount == 1)
            //datasets with id available to display
            res.send(data.rows);
          else {
            //datasets with id not available to display from the database
            var detail: string = `Key (id)=(${id}) does not exist.`;
            var errorStatus: string = "ERROR";
            const obj1 = {
              status: `${errorStatus}`,
              message: `${detail}`,
            };
            res.status(404).json(obj1);
          }
        }
      );
    } else {
      //id not provided by the user
      var detail: string = `Id is undefined. Cannot retrieve datasets`;
      var errorStatus: string = "ERROR";
      const obj1 = {
        status: `${errorStatus}`,
        message: `${detail}`,
      };
      res.status(400).json(obj1);
    }
    pool.end;
    // return true;
  } catch (error) {
    // Database error
    
    res.status(500).json(dberror);
  }
};

export default connectDb;
