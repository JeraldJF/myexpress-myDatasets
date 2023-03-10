const express = require("express");
const app = express();
const bodyParser = require("body-parser");
import { Pool } from "pg";
import pool1 from "./Connection";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function(req: any, res: any){
    const connectDb = async () => {
      
      try {
        const pool = new Pool({
          user: "user1",
          host: "localhost",
          database: "datasets",
          password: "JER@ALD",
          port: 5432,
        });
      ;
        // if(pool.password=="JER@ALD"){ //Checking for password
  
        // console.log(req.body.dname);
  
        var id = req.body.id;
        var ds = req.body.data_schema;
        var rc = req.body.router_config;
        var dataSchema = JSON.stringify(ds);
        var routerConfig = JSON.stringify(rc);
        var status1: string = req.body.status;
        
        
        var createdBy = req.body.created_by;
        var updatedBy = req.body.updated_by;
  
        var cDate = new Date();
        var uDate=new Date();
        var createdDate = cDate.toLocaleString();
        var updatedDate=uDate.toLocaleString();
  
        await pool.connect();
        const pk = await pool.query(`SELECT * FROM datasets WHERE '${id}'=id`);
        const Nid = Number(id);
        console.log(Nid);
        
        if (Nid) {//datasets provided to post
          // if(!(Nid===id)){ //id is of given datatype or not
          if (pk.rowCount == 0) {
            //primary key not voilated
            
            
            if(status1==undefined){
            await pool.query(
              `INSERT INTO datasets(id, data_schema, router_config, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${createdBy}', '${updatedBy}', '${createdDate}', '${updatedDate}');`
            );
            }
            else{
              await pool.query(
                `INSERT INTO datasets(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}', '${updatedDate}');`
              );
            }
  
            var detail: string = `datasets inserted in the table successfully`;
            var Status: string = "SUCCESS";
            const obj1: { status: string; message: string } = {
              status: `${Status}`,
              message: `${detail}`,
            };
  
            res.status(200).json(obj1);
          } else {
            //primary key voilation
  
            var detail: string = `Datasets with Key (id)=(${id}) already exists`;
            var errorStatus: string = "ERROR";
            const obj1 = {
              status: `${errorStatus}`,
              message: `${detail}`,
            };
  
            res.status(400).json(obj1);
          }
        // }
          // else{
          //   var detail: string = `${id} is not a string. Cannot Add`;
          //   var errorStatus: string = "ERROR";
          //   const obj1 = {
          //     status: `${errorStatus}`,
          //     message: `${detail}`,
          //   };
          //   res.status(400).json(obj1);
          
          // }
        
        } else {
          // datasets not provided to post
          var detail: string = `No Datasets given to add`;
          var errorStatus: string = "ERROR";
          const obj1: { status: string; message: string } = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };
          res.status(400).json(obj1);
        }
  
        await pool.end();
        return true;
      // }
      // else{
      //   var detail: string = `Database Password Incorrect`;
      //     var errorStatus: string = "ERROR";
      //     const obj1: { status: string; message: string } = {
      //       status: `${errorStatus}`,
      //       message: `${detail}`,
      //     };
      //     res.status(500).json(obj1);
      // }
      } catch (error: any) {
        // Database error
        const obj1 = {
          status: "ERROR",
          message: "Cannot add datasets",
        };
        res.status(500).json(obj1);
      }
    };
    connectDb();
  }
