import { error } from "console";

const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const fs = require("fs");
const { Client } = require("pg");
// var getDataSet=require("./getDataSet.ts");

// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/dataset/get", (req: any, res: any) => {
  const connectDb = async () => {
    try {
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });
      await client.connect();
      
      const gotData = await client.query("SELECT * FROM datasets");
      if(gotData.rowCount>0){
        res.send(gotData);
      }
      else{
        var detail: string = `Table is empty`;
          var errorStatus: string = "ERROR";
          const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`
          };
          const statusJson = JSON.stringify(obj1);

          
          res.send(statusJson);
      }
      await client.end();
    } catch (error) {
        console.log(error);
        
    }
  };
  connectDb();
});

app.get("/dataset/getById", (req: any, res: any) => {
  const connectDb = async () => {
    try {
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });
      await client.connect();
      var getid=req.query.id;
      var id=Number(getid);
    
        const gotData = await client.query(`SELECT * FROM datasets WHERE id='${id}'`);

        if(gotData.rowCount>0)
        res.send(gotData);
        else{
          var detail: string = `Key (id)=(${id}) does not exist.`;
          var errorStatus: string = "ERROR";
          const obj1 = {
            status: `${errorStatus}`,
            message: `${detail}`
          };
          const statusJson = JSON.stringify(obj1);
          res.send(statusJson);
        }
      await client.end();
     return true;
    } catch (error) {
      console.log(error);
      
    }
  };
  connectDb();
});

app.post("/dataset/create", (req: any, res: any) => {
  

  const connectDb = async () => {
    let pK: any;
    try {
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });

      // console.log(req.body.dname);

      var id = req.body.id;
      var name1 = req.body.dname;
      var age = req.body.age;
      var name2 = req.body.rname;
      var method = req.body.method;
      var ds = { name: `${name1}`, age: `${age}` };
      var rc = { name: `${name2}`, method: `${method}` };
      var dataSchema = JSON.stringify(ds);
      var routerConfig = JSON.stringify(rc);
      var status1: string = req.body.status;
      var createdBy = req.body.created_by;
      var updatedBy = req.body.updated_by;

      var cDate = new Date();
      var createdDate = cDate.toLocaleString();
      // console.log(createdDate);

      await client.connect();
      
      const pk = await client.query(`SELECT * FROM datasets WHERE '${id}'=id`);

      if (pk.rowCount == 0) {
        const count=await client.query(
          `INSERT INTO datasets(id, data_schema, router_config, status, created_by, updated_by, created_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}');`
        );
        console.log(count.rows);
        

        // fs.readFile(
        //   __dirname + "/success.json",
        //   "utf8",
        //   function (err: any, data: any) {
        //     var message=JSON.parse(data);
            
        //     res.send(message);
        //   }
        // );
      } else {
        var errorCode: string = "23505";
        var detail: string = `Key (id)=(${id}) already exists.`;
        var errorStatus: string = "ERROR";
        const obj1 = {
          status: `${errorStatus}`,
          message: `${detail}`,
          error_code: `${errorCode}`,
        };
        const statusJson = JSON.stringify(obj1);
        console.log(statusJson);
        
        res.send(statusJson);
      }

    

      await client.end();
      return true;
    } catch (error: any) {
   

      console.log(error);

      // if(pK.rowCount==1){
      //   var errorCode:string=error.code;
      // var detail:string=error.detail;
      // var errorStatus:string=error.severity;
      // const obj1=`{status:${errorStatus},message:${detail},error_code:${errorCode}}`;
      // const statusJson=JSON.parse(obj1);
      // res.send(statusJson);
      // }
    }
  };
  connectDb();
});

app.put("/datasets/updateData", (req: any, res: any) => {
  const connectDb = async () => {
    try {
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });

      // console.log(req.body);

      var id = req.body.id;
      var rname = req.body.rname;
      var rmethod = req.body.method1;
      var rc = { name: `${rname}`, method: `${rmethod}` };
      var routerConfig = JSON.stringify(rc);
      // var status=req.body.status;
      // var updatedDate:any=new Date().getFullYear()+"-"+((new Date().getMonth())+1)+"-"+new Date().getHours()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
      // var createdDate:any=new Date().getFullYear()+"-"+((new Date().getMonth())+1)+"-"+new Date().getHours()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();;

      await client.connect();
      var created = new Date();
      var updated = new Date();

      var createdDate = created.toLocaleString();
      var updatedDate = updated.toLocaleString();
      console.log(
        `UPDATE datasets SET created_date=${createdDate},updated_date=${updatedDate},router_config='${routerConfig}' WHERE id = '101';`
      );
      await client.query(
        `UPDATE datasets SET created_date='${createdDate}',updated_date='${updatedDate}',router_config='${routerConfig}' WHERE id = '${id}';`
      );
      const updateddb = await client.query("SELECT * FROM datasets");

      res.send(updateddb);
      await client.end();
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  connectDb();
});

app.listen(port, () => {
  // console.log(id);

  console.log(`port number ${port} is working`);
});
