const express = require("express");
// import { Request, Response } from "express";
const app = express();
// const port = 3001;
const bodyParser = require("body-parser");
// const fs = require("fs");
const { Client } = require("pg");
// const Joi = require('joi')
// const validator = require('express-joi-validation').createValidator({})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default function(req: any, res: any){
    const connectDb = async () => {
      let pK: any;
      try {
        const client = new Client({
          user: "user1",
          host: "localhost",
          database: "datasets",
          password: "JER@ALD",
          port: 5432,
        });
        if(client.password=="JER@ALD"){ //Checking for password
  
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
        var createdDate = cDate.toLocaleString();
  
        await client.connect();
        const pk = await client.query(`SELECT * FROM datasets WHERE '${id}'=id`);
        const Nid = Number(id);
  
        if (Nid) {
          //datasets provided to post
          if (pk.rowCount == 0) {
            //primary key not voilated
            await client.query(
              `INSERT INTO datasets(id, data_schema, router_config, status, created_by, updated_by, created_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}');`
            );
  
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
        } else {
          // datasets not provided to post
          var detail: string = `No Datasets to add`;
          var errorStatus: string = "ERROR";
          const obj1: { status: string; message: string } = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };
          res.status(400).json(obj1);
        }
  
        await client.end();
        return true;
      }
      else{
        var detail: string = `Database Password Incorrect`;
          var errorStatus: string = "ERROR";
          const obj1: { status: string; message: string } = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };
          res.status(500).json(obj1);
      }
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
