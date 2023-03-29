require('dotenv').config();
const express=require('express');

var app = express();
const port = 3006;

import getDataSet from "./routes/getDataSet";
import addDataSets from "./routes/addDataSets";
import getDatasetById from "./routes/getDatasetById";
import updateDataSet from "./routes/updateDataSet";
import removeDataSet from "./routes/removeDataSet";
import partialupdate from "./routes/partialupdate";


app.use(express.json());

app.get("/datasets/get", getDataSet);

app.get("/datasets/id/:id", getDatasetById);

app.post("/datasets/addData", addDataSets); 

app.put("/datasets/updateData/:id", updateDataSet);

app.patch("/datasets/patchData/:id", partialupdate);

app.delete("/datasets/deleteData/:id", removeDataSet);

app.all("*",(req:any,res:any)=>{
  const route_error: object= {
    status: `ERROR`,
    message: `Invalid route`
  };
res.status(404).json(route_error);
})


app.listen(port, (error:any) => {
  if(error)
  console.log(`error at port ${port}`);
  else
  console.log(`port number ${port} is working`);
});

module.exports=app;
