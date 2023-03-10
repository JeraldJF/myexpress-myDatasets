const express = require("express");


const app = express();
const port = 3001;

// const Joi = require('joi')
// const validator = require('express-joi-validation').createValidator({})
import getDataset from "./public/typescripts/getDataSet";
import addDataset from "./public/typescripts/addDataSets";
import getDatasetsById from "./public/typescripts/getDatasetById";
import updateDataSet from "./public/typescripts/updateDataSet";
import removeDataSet from "./public/typescripts/removeDataSet";
// import imports from "./public/typescripts/imports";

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

app.delete("/dataset/removeData", removeDataSet);



app.listen(port, (error:any) => {
  if(error)
  console.log(`error at port ${port}`);
  else
  console.log(`port number ${port} is working`);
});
