require('dotenv').config();
const express=require('express');

var app = express();
const port = 3006;


import {get} from "./helpers/testCon";
import {post} from "./helpers/testCon";
import {getbyid} from "./helpers/testCon";
import {fupdate} from "./helpers/testCon";
import {remove} from "./helpers/testCon";
import {pupdate} from "./helpers/testCon";
import { select } from "./helpers/queries";
// import testCon from "./helpers/testCon";


app.use(express.json());

app.get("/datasets/get", get);

app.get("/datasets/id/:id", getbyid);

app.post("/datasets/addData", post); 

app.put("/datasets/updateData/:id", fupdate);

app.patch("/datasets/patchData/:id", pupdate);

app.delete("/datasets/deleteData/:id", remove);

app.all("*",(req:any,res:any)=>{
  const route_error: object= {
    status: `ERROR`,
    message: `Invalid route`
  };
res.status(404).json(route_error);
})


app.listen(port, (error:any) => {
  console.log(`port number ${port} is working`);
});

// module.exports=app;
export default app;
