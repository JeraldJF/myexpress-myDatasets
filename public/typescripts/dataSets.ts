const express=require('express');

var app = express();
const port = 3001;

import getDataSet from "./getDataSet";
import addDataSets from "./addDataSets";
import getDatasetById from "./getDatasetById";
import updateDataSet from "./updateDataSet";
import removeDataSet from "./removeDataSet";
import updatepartially from "./partialupdate";


app.use(express.json());

app.get("/datasets/get", getDataSet);

app.get("/datasets/id/:id", getDatasetById);

app.post("/datasets/addData", addDataSets); 

app.put("/datasets/updateData/:id", updateDataSet);

app.patch("/datasets/updateStatus/:id", updatepartially);

app.delete("/datasets/deleteData/:id", removeDataSet);

app.all("*",(req:any,res:any)=>{
  const route_error: object= {
    status: `ERROR`,
    message: `Invalid route`
  };
res.status(400).json(route_error);
})


app.listen(port, (error:any) => {
  if(error)
  console.log(`error at port ${port}`);
  else
  console.log(`port number ${port} is working`);
});

module.exports=app;
