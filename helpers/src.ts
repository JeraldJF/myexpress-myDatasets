import config from "../config/config";
const express = require("express");
const app = express();

import jsonSchema from "./schema";

app.use(express.json());
import { datatypes_error } from "./errors";
import { inserted } from "./success";
import { database_error } from "./errors";
import { insertdata, selectid, select, deleteid, update } from "./queries";
import { createdDate, updatedDate } from "./dates";
import { response } from "express";

const { Client } = require("pg");
var pool = new Client(config);

pool.connect();

var get = async (req: any, res: any) => {
  try {
    let respond = await pool.query(select);
    // fetch('http://localhost:8000/api/prometheus/grafana/api/v1/rules?subtype=cortex').then((response)=>response.text()).then((body)=>{
    //   if (body) {
    if (respond.rowCount > 1) {
      // display datasets
      res.status(200).send(respond.rows);
    } else {
      var detail: string = `Table is empty`;
      var errorStatus: string = "ERROR";
      const obj1 = {
        status: `${errorStatus}`,
        message: `${detail}`,
      };
      res.status(404).json(obj1);
    }
  } catch (error) {
    if (error) res.status(500).json(database_error);
  }
};

var getbyid = async (req: any, res: any) => {
  try {
    var id = req.params["id"];
    const dataById = await pool.query(selectid + `id='${id}';`);
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
      res.status(404).json(obj1);
    }
  } catch (error) {
    res.status(500).json(database_error);
  }
};

var pupdate = async (req: any, res: any) => {
  const { error } = jsonSchema.validate(req.body, {
    abortEarly: false, //for datatype checking using joi schema
  });

  var id = req.params["id"];
  // try {
  var data = await pool.query(selectid + `'${id}'=id`);

  var ds = req.body.data_schema || data.rows[0].data_schema;
  var rc = req.body.router_config || data.rows[0].router_config;
  var dataSchema = JSON.stringify(ds);
  var routerConfig = JSON.stringify(rc);
  var status1 = req.body.status || data.rows[0].status;

  var createdBy = req.body.created_by || data.rows[0].created_by;
  var updatedBy = req.body.updated_by || data.rows[0].updated_by;

  if (error) {
    //wrong datatypes use
    res.status(422).json(datatypes_error);
  } else {
    //given id present in datasets to update
    if (data.rowCount == 1) {
      const patchdata = await pool.query(
        update +
          `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${createdDate}',updated_date='${updatedDate}' WHERE id = '${id}';`
      );
      //update success
      var detail: string = `datasets updated in the table successfully`;
      var status: string = "SUCCESS";
      const obj1 = {
        status: `${status}`,
        message: `${detail}`,
      };
      res.status(200).json(obj1);
    } else {
      //datasets with key not available in database to update
      var detail: string = `Datasets with Key (id)=(${id}) does not exist.`;
      var errorStatus: string = "ERROR";
      const obj1 = {
        status: `${errorStatus}`,
        message: `${detail}`,
      };
      res.status(404).json(obj1);
    }
  }
};

var fupdate = async (req: any, res: any) => {
  const { error } = jsonSchema.validate(req.body, {
    //for datatype checking using joi schema
    abortEarly: false,
  });

  var id = req.params["id"];
  var ds = req.body.data_schema;
  var rc = req.body.router_config;
  var dataSchema = JSON.stringify(ds);
  var routerConfig = JSON.stringify(rc);
  var status1 = req.body.status;
  var createdBy = req.body.created_by;
  var updatedBy = req.body.updated_by;

  if (error) {
    //wrong datatypes use
    return res.status(422).json(datatypes_error);
  } else {
    // try {
    var result = await pool.query(
      update +
        `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${createdDate}',updated_date='${updatedDate}' WHERE id = '${id}';`
    );
    if (result.error) {
      res.status(500).json(database_error);
    } else {
      if (result.rowCount == 1) {
        //given id present in datasets to update
        var detail: string = `datasets updated in the table successfully`;
        var status: string = "SUCCESS";
        const obj1 = {
          status: `${status}`,
          message: `${detail}`,
        };

        res.status(200).json(obj1);
      } else {
        //datasets with key not available in database to update
        var detail: string = `Datasets with Key (id)=(${id}) does not exist.`;
        var errorStatus: string = "ERROR";
        const obj1 = {
          status: `${errorStatus}`,
          message: `${detail}`,
        };
        res.status(404).json(obj1);
      }
    }
  }
};

var post = async (req: any, res: any) => {
  var id = req.body.id;
  var ds = req.body.data_schema;
  var rc = req.body.router_config;
  var dataSchema = JSON.stringify(ds);
  var routerConfig = JSON.stringify(rc);
  var status1: string = req.body.status;

  var createdBy = req.body.created_by;
  var updatedBy = req.body.updated_by;
  
  
  var { error } = jsonSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    //datatype checking

    res.status(422).json(datatypes_error);
  } else {
    // try {
    const data = await pool.query(
      insertdata +
        `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}', '${updatedDate}') ON CONFLICT (id) 
          DO NOTHING;`
    );
    if (data.rowCount == 0) {
      var detail: string = `Datasets with Key (id)=(${id}) already exists`;
      var errorStatus: string = "ERROR";
      const obj1 = {
        status: `${errorStatus}`,
        message: `${detail}`,
      };

      res.status(409).send(obj1);
    } else {
      res.status(200).send(inserted);
    }
  }
};

var remove = async (req: any, res: any) => {
  var id = req.params["id"];

  var data = await pool.query(deleteid + `'${id}';`);
  if (data.rowCount == 1) {
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
    res.status(404).json(obj1);
  }
};

export { get, getbyid, post, remove, pupdate, fupdate, pool };
