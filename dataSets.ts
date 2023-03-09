const express = require("express");
// import { Request, Response } from "express";
const app = express();
const port = 3001;
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const { Client } = require("pg");
// const Joi = require('joi')
// const validator = require('express-joi-validation').createValidator({})
import getDataset from "./public/typescripts/getDataSet";
import addDataset from "./public/typescripts/addDataSets";
import getDatasetsById from "./public/typescripts/getDatasetsById";
import updateDataSet from "./public/typescripts/updateDataSet";

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// const querySchema = Joi.object({
//   id: Joi.string().required()
//   // ds: Joi.object().required(),
//   // rc: Joi.object().required(),
//   // status1:Joi.string().required(),
//   // created_by:Joi.string().required(),
//   // updated_by:Joi.string().required()
// });


app.get("/dataset/get", getDataset);

app.get("/dataset/getById",getDatasetsById);

app.post("/dataset/create", addDataset);

app.put("/dataset/updateData", updateDataSet);



app.listen(port, () => {
  console.log(`port number ${port} is working`);
});
