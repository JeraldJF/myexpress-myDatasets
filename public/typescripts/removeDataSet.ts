const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
import { Pool } from "pg";
// import pool1 from "./Connection";

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

      await pool.connect();
      var id = req.query.id;

      var Nid = Number(id);
      if (Nid) {
        //datasets given to delete
        const a = await pool.query(`DELETE FROM datasets WHERE id='${id}';`);
        if (a.rowCount == 1) {
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

      await pool.end();
      return true;
    } catch (error) {
      // Database error
      const obj1 = {
        status: "ERROR",
        message: "Cannot delete datasets",
      };
      res.status(500).json(obj1);
    }
  };
  connectDb();
}
