const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Client } = require("pg");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function(req: any, res: any){
    const connectDb = async () => {
      try {
        const client = new Client({
          user: "user1",
          host: "localhost",
          database: "datasets",
          password: "JER@ALD",
          port: 5432,
        });
        await client.connect();
        var getall=req.body;
        var id = req.body.id;
        var Nid = Number(id);
        var rc = req.body.router_config;
        var routerConfig = JSON.stringify(rc);
        var created = new Date();
        var updated = new Date();
  
        var createdDate = created.toLocaleString();
        var updatedDate = updated.toLocaleString();
        if(getall){
        if (Nid) {
          //datasets given to update
          const pkeyvoilate = await client.query(
            `SELECT * FROM datasets WHERE '${id}'=id`
          );
          if (pkeyvoilate.rowCount == 1) {
            //given id present in datasets to update
            await client.query(
              `UPDATE datasets SET created_date='${createdDate}',updated_date='${updatedDate}',router_config='${routerConfig}' WHERE id = '${id}';`
            );
            var detail: string = `datasets updated in the table successfully`;
            var status: string = "SUCCESS";
            const obj1 = {
              status: `${status}`,
              message: `${detail}`,
            };
  
            res.status(200).json(obj1);
          } else {
            //datasets with key not available in database to update
            var detail: string = `Datasets with Key (id)=(${id}) does not exist. Cannot Update`;
            var errorStatus: string = "ERROR";
            const obj1 = {
              status: `${errorStatus}`,
              message: `${detail}`,
            };
            res.status(400).json(obj1);
          }
        }
        } else {
          //no datasets given
          const status: string = "Error";
          const message: string = "No Datasets given to Update";
          const objmessage: object = {
            status: `${status}`,
            message: `${message}`,
          };
          res.status(400).json(objmessage);
        }
  
        await client.end();
        return true;
      } catch (error) {
        // Database error
        const obj1 = {
          status: "ERROR",
          message: "Cannot update datasets",
        };
        res.status(500).json(500);
      }
    };
    connectDb();
  }