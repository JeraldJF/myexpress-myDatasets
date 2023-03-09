const express = require("express");
import { Request, Response } from "express";
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const fs = require("fs");
const { Client } = require("pg");
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
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
        const client = new Client({
          user: "user1",
          host: "localhost",
          database: "datasets",
          password: "JER@ALD",
          port: 5432,
        });
        await client.connect();
        var id = req.query.id;
        
        
        
  
        const gotData = await client.query(
          `SELECT * FROM datasets WHERE id='${id}'`
        );
  
        if (gotData.rowCount > 0)
          res.send(gotData); //datasets with id available to display
        else {
          //datasets with id not available to display
          var detail: string = `Key (id)=(${id}) does not exist.`;
          var errorStatus: string = "ERROR";
          const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`,
          };
          res.status(400).json(obj1);
        }
        await client.end();
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