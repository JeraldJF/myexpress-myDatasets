import pool from "../helpers/connection";
import { select } from "../helpers/queries";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var connectDB = (req: any, res: any) => {
  try {
    pool.query(select, (error: any, data: any) => {
      if (data.rowCount > 0) {
        // display datasets
        res.send(data.rows);
      } else {
        //No data in table to display
        var detail: string = `Table is empty`;
        var errorStatus: string = "ERROR";
        const obj1 = {
          status: `${errorStatus}`,
          message: `${detail}`,
        };
        res.status(404).json(obj1);
      }
    });
    pool.end;
  } catch (error) {
    // Database error
    console.log(error);
    const obj1 = {
      status: "ERROR",
      message: "Cannot Display Datasets",
    };
    res.status(500).json(error);
  }
};

export default connectDB;
