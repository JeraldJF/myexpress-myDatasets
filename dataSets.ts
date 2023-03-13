const express = require("express");



var app = express();
const port = 3001;


import getDataset from "./public/typescripts/getDataSet";
import addDataset from "./public/typescripts/addDataSets";
import getDatasetsById from "./public/typescripts/getDatasetById";
import updateDataSet from "./public/typescripts/updateDataSet";
import removeDataSet from "./public/typescripts/removeDataSet";
// import imports from "./public/typescripts/imports";

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());





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

module.exports=app;
