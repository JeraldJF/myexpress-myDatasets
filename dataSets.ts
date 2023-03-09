const express = require("express");
// import { Request, Response } from "express";
const app = express();
const port = 3001;
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const { Client } = require("pg");
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
import getDataset from "./getDataSet";
import addDataset from "./addDataSets";
import getDatasetsById from "./getDatasetsById";
import updateDataSet from "./updateDataSet";

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const querySchema = Joi.object({
  id: Joi.string().required()
  // ds: Joi.object().required(),
  // rc: Joi.object().required(),
  // status1:Joi.string().required(),
  // created_by:Joi.string().required(),
  // updated_by:Joi.string().required()
});


app.get("/dataset/get", getDataset);

app.get("/dataset/getById", validator.query(querySchema),getDatasetsById);

app.post("/dataset/create",validator.query(querySchema), addDataset);

app.put("/dataset/updateData",validator.query(querySchema), updateDataSet);



app.listen(port, () => {
  console.log(`port number ${port} is working`);
});
