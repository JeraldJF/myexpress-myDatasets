import { error } from "console";


const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const { Client } = require("pg");

// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
//
app.get("/dataset/get", (req: any, res: any) => {
  const connectDb=async()=>{
  try{
    const client = new Client({
      user: "user1",
      host: "localhost",
      database: "datasets",
      password: "JER@ALD",
      port: 5432,
    });
    await client.connect();
    const gotData=await client.query("SELECT * FROM datasets");
    res.send(gotData);
    await client.end();
    return true;
  }
  catch(error){
    console.log(error);
  }
  }
  connectDb();
  
});

app.post("/dataset/create", (req: any, res: any) => {
  
  // var createdDate:Date=new Date('2019-08-23');
  // var updatedDate:Date=new Date('2020-07-08');

  // id=req.body.id;
  // name1=req.body.name1;
  // age=req.body.age;
  // name2=req.body.name2;
  // method=req.body.method;
  // dataSchema=`{"name":"${name1}","age":"${age}"}`;
  // routerConfig=`{"name":"${name2}","method":"${method}"}`;
  // status=req.body.status;
  // createdBy=req.body.cby;
  // updatedBy=req.body.uby;
  // createdDate=req.body.cd;
  // updatedDate=req.body.ud;
  // var id:any;
  // var name1;
  // var age;
  // var name2;
  // var method;
  // var dataSchema;
  // var routerConfig;
  // var status: string;
  // var createdBy: string;
  // var updatedBy: string;
  
  
  

  const connectDb = async () => {
    try {
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });

        // console.log(req.body.dname);

      var id =req.body.id;
      var name1 =req.body.dname;
      var age = req.body.age;
      var name2 = req.body.rname;
      var method = req.body.method;
      var ds = { name: `${name1}`, age: `${age}` };
      var rc = { name: `${name2}`, method: `${method}` };
      var dataSchema = JSON.stringify(ds);
      var routerConfig = JSON.stringify(rc);
      var status1:string = req.body.status;
      var createdBy = req.body.created_by;
      var updatedBy = req.body.updated_by;
      
      var cDate = new Date();
      var createdDate=cDate.toLocaleString();
      // console.log(createdDate);
      

      await client.connect();
      // console.log(`INSERT INTO datasets(id, data_schema, router_config, status, created_by, updated_by, created_date) VALUES('${id}', ${dataSchema}, ${routerConfig}, ${status1}, ${createdBy}, ${updatedBy}, ${createdDate});`);
      
      await client.query(
        `INSERT INTO datasets(id, data_schema, router_config, status, created_by, updated_by, created_date) VALUES('${id}', '${dataSchema}', '${routerConfig}', '${status1}', '${createdBy}', '${updatedBy}', '${createdDate}');`,(error:any)=>{
        if(error.code==23505 && error.constraint=='datasets_pkey'){
          console.log(error.severity);
          console.log(error.detail);
        }
      }
        
        );
            
        
      // const res2=await client.query(`UPDATE datasets SET data_schema = $1 WHERE id= $2`,[dataSchema,id]);
      // const res3=await client.query(`DELETE FROM datasets WHERE id= $1`,[id]);

      const updateddb = await client.query("SELECT * FROM datasets");

      res.send(updateddb);
      await client.end();
      return true;
    } catch (error){
      // if(error&&error.code==='23505')
      // console.log(id +" is a Duplicate id");

      console.log(error);
    }
  }
  connectDb();
});

// var id: any;
// app.put("/updateData", (req: any, res: any) =>{
//   const connectDb = async () =>{
//     try{
//       const client = new Client({
//         user: "user1",
//         host: "localhost",
//         database: "datasets",
//         password: "JER@ALD",
//         port: 5432,
//       });

//       // console.log(req.body);

//       id = req.body.id;
//       var rname = req.body.rname;
//       var rmethod = req.body.method1;
//       var rc = {name: `${rname}`, method:`${rmethod}`};
//       var routerConfig = JSON.stringify(rc);
//       // var status=req.body.status;
//       // var updatedDate:any=new Date().getFullYear()+"-"+((new Date().getMonth())+1)+"-"+new Date().getHours()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
//       // var createdDate:any=new Date().getFullYear()+"-"+((new Date().getMonth())+1)+"-"+new Date().getHours()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();;

//       await client.connect();
// var created=new Date();
// var updated=new Date();

// var createdDate=created.toLocaleString();
// var updatedDate=updated.toLocaleString();
// console.log(`UPDATE datasets SET created_date=${createdDate},updated_date=${updatedDate},router_config='${routerConfig}' WHERE id = '101';`);
//       await client.query(`UPDATE datasets SET created_date='${createdDate}',updated_date='${updatedDate}',router_config='${routerConfig}' WHERE id = '${id}';`);
//       const updateddb = await client.query("SELECT * FROM datasets");

//       res.send(updateddb);
//       await client.end();
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   connectDb();
// });

app.listen(port, () => {
  // console.log(id);

  console.log(`port number ${port} is working`);
});
