import { Pool } from "pg";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const pool1=require("./Connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function (req: any, res: any) {
  const connectDb = async () => {
    try {
      const pool = new Pool({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });
      // console.log(pool);
      
      

      await pool.connect();

      const gotData = await pool.query("SELECT * FROM datasets");
      if (gotData.rowCount > 0) {
        //display datasets
        res.send(gotData);
      } else {
        //No data in table to display
        var detail: string = `Table is empty`;
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
      const obj1 = {
        status: "ERROR",
        message: "Cannot Display Datasets",
      };
      res.status(500).json(obj1);

      
    }
  };
  connectDb();
}
