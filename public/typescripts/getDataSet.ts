import { Pool } from "pg";
// import {pool1} from "./Connection";
import { select } from "./queries";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const pool1=require("./Connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function (req: any, res: any) {
  const connectDb = async () => {
    // var pool = pool1;
    // console.log(pool);
    // pool.connect();
    try {
      var pool= new Pool({
        user: "user1",
        host: "host.docker.internal",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });
      await pool.connect();

      const gotData = await pool.query(select);
      if (gotData.rowCount > 0) {
        //display datasets
        res.send(gotData.rows);
        // pool.end();
      } else {
        //No data in table to display
        var detail: string = `Table is empty`;
        var errorStatus: string = "ERROR";
        const obj1 = {
          status: `${errorStatus}`,
          message: `${detail}`,
        };
        res.status(400).json(obj1);
        // pool.end();
      }
      await pool.end();
      return true;
    } catch (error) {
      // Database error
      // console.log(error);
      const obj1 = {
        status: "ERROR",
        message: "Cannot Display Datasets",
      };
      res.status(500).json(error);
      
      
      // await pool.end();
      
    }
  };
  connectDb();
}
