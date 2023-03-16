import { Request, Response } from "express";
import { Pool } from "pg";
import { selectid } from "./queries";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const pool1=require("./Connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function (req: Request, res: Response) {
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

      if (id) {
        //User provided id to retreive datasets
        const dataById = await pool.query(
          selectid+`id='${id}';`
        );

        if (dataById.rowCount == 1)
          //datasets with id available to display
          res.send(dataById.rows);
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
      await pool.end();
      // return true;
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
