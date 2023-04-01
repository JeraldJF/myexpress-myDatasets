import config from "../config/config";
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// import { Pool } from "pg";
import jsonSchema from "./schema";
// import pool from "../../Config/Connection";
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
import { datatypes_error } from "./errors";
import { inserted } from "./success";
import { nodatasets } from "./errors";
import { insertdata, selectid, select, deleteid, update } from "./queries";
import { createdDate, updatedDate } from "./dates";

const { Pool } = require("pg");

var pool = new Pool(config);

var get = async (req: any, res: any) => {
  const con = await pool.connect();
  // try {
  let respond = await pool.query(select);
  if (respond.rowCount != 0) {
    // display datasets
    res.status(200).send(respond.rows);
  } else {
    //No data in table to display
    var detail: string = `Table is empty`;
    var errorStatus: string = "ERROR";
    const obj1 = {
      status: `${errorStatus}`,
      message: `${detail}`,
    };
    res.sendStatus(404);
  }
};

var post = async (req: any, res: any) => {
  // const con=await pool.connect();
  var { error } = jsonSchema.validate(req.body, {
    abortEarly: false,
  });

  var id = req.body.id;
  var ds = req.body.data_schema;
  var rc = req.body.router_config;
  var dataSchema = JSON.stringify(ds);
  var routerConfig = JSON.stringify(rc);
  var status1: string = req.body.status;

  var createdBy = req.body.created_by;
  var updatedBy = req.body.updated_by;

  var data = await pool.query(selectid + `'${id}'=id;`);
  if (data.rowCount == 0) {
    //no primary key voilation
    if (error) {
      //datatype checking

      res.status(422).json(datatypes_error);
    } else {
      await pool.query(
        insertdata +
          `(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}', '${updatedDate}');`
      );

      res.status(200).send(insertdata);
    }
  } else {
    //primary key voilation

    var detail: string = `Datasets with Key (id)=(${id}) already exists`;
    var errorStatus: string = "ERROR";
    const obj1 = {
      status: `${errorStatus}`,
      message: `${detail}`,
    };

    res.status(409).send(obj1);
  }
};

var getbyid = async (req: any, res: any) => {
  const dberror = {
    status: "ERROR",
    message: "Cannot Display Datasets",
  };

  var id = req.params["id"];

  const dataById = await pool.query(selectid + `id='${id}';`);
  // (error: any, data: any) => {

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
};

var remove = async (req: any, res: any) => {
  const error = {
    status: "ERROR",
    message: "Cannot delete datasets",
  };
  // try {
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

var pupdate = async (req: any, res: any) => {
  const { error } = jsonSchema.validate(req.body, {
    abortEarly: false, //for datatype checking using joi schema
  });
  var dberror = {
    status: "ERROR",
    message: "Cannot add datasets",
  };

  // try {
  var id = req.params["id"];

  var data = await pool.query(selectid + `'${id}'=id`);
  if (data.rowCount == 1) {
    if (error) {
      //wrong datatypes use
      res.status(422).json(datatypes_error);
    } else {
      //given id present in datasets to update
      var ds = req.body.data_schema || data.rows[0].data_schema;
      var rc = req.body.router_config || data.rows[0].router_config;
      var dataSchema = JSON.stringify(ds);
      var routerConfig = JSON.stringify(rc);
      var status1: string = req.body.status || data.rows[0].status;

      var createdBy = req.body.created_by || data.rows[0].created_by;
      var updatedBy = req.body.updated_by || data.rows[0].updated_by;
      await pool.query(
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
    }
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
};

var fupdate = async (req: any, res: any) => {
  const { error } = jsonSchema.validate(req.body, {
    //for datatype checking using joi schema
    abortEarly: false,
  });
  var dberror = {
    status: "ERROR",
    message: "Cannot add datasets",
  };
  // try {

  var id = req.params["id"];
  var ds = req.body.data_schema;
  var rc = req.body.router_config;
  var dataSchema = JSON.stringify(ds);
  var routerConfig = JSON.stringify(rc);
  var status1: string = req.body.status;

  var createdBy = req.body.created_by;
  var updatedBy = req.body.updated_by;

  if (error) {
    //wrong datatypes use
    return res.status(422).json(datatypes_error);
  } else {
    var result = await pool.query(
      update +
        `data_schema='${dataSchema}', router_config='${routerConfig}', status='${status1}' ,created_by='${createdBy}', updated_by='${updatedBy}', created_date='${createdDate}',updated_date='${updatedDate}' WHERE id = '${id}';`
    );
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

  pool.end;
};

export { get, getbyid, post, remove, pupdate, fupdate, pool };
