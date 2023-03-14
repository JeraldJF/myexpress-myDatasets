const express=require('express');



var app = express();
const port = 3001;


import getDataSet from "./getDataSet";
import addDataSets from "./addDataSets";
import getDatasetById from "./getDatasetById";
import updateDataSet from "./updateDataSet";
import removeDataSet from "./removeDataSet";
// import imports from "./public/typescripts/imports";

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());





app.get("/dataset/get", getDataSet);

app.get("/dataset/getById", getDatasetById);

app.post("/dataset/create", addDataSets);

app.put("/dataset/updateData", updateDataSet);

app.delete("/dataset/removeData", removeDataSet);



app.listen(port, (error:any) => {
  if(error)
  console.log(`error at port ${port}`);
  else
  console.log(`port number ${port} is working`);
});

// module.exports=app;
