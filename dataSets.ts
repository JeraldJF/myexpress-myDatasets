const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const { Client } = require("pg");

app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));

//
app.get("/", (req: any, res: any) => {
  res.send("Hi");
});

// app.post("/adddata", (req: any, res: any) => {
//   // var id:string="102";
//   // var ds={name:"Vivek",age:"20"};
//   // var dataSchema=JSON.stringify(ds);
//   // var rs={name:"Indices",method:"Post"};
//   // var routerConfig=JSON.stringify(rs);
//   // var status:string="False";
//   // var createdBy:string="User2";
//   // var updatedBy:string="User3";
//   // var createdDate:Date=new Date('2019-08-23');
//   // var updatedDate:Date=new Date('2020-07-08');

//   // id=req.body.id;
//   // name1=req.body.name1;
//   // age=req.body.age;
//   // name2=req.body.name2;
//   // method=req.body.method;
//   // dataSchema=`{"name":"${name1}","age":"${age}"}`;
//   // routerConfig=`{"name":"${name2}","method":"${method}"}`;
//   // status=req.body.status;
//   // createdBy=req.body.cby;
//   // updatedBy=req.body.uby;
//   // createdDate=req.body.cd;
//   // updatedDate=req.body.ud;

//   var name1;
//   var age;
//   var name2;
//   var method;
//   var dataSchema;
//   var routerConfig;
//   var status: string;
//   var createdBy: string;
//   var updatedBy: string;
//   var createdDate: any;

//   const connectDb = async () => {
//     try {
//       const client = new Client({
//         user: "user1",
//         host: "localhost",
//         database: "datasets",
//         password: "JER@ALD",
//         port: 5432,
//       });

//       //   console.log(req.body);

//       id = req.body.id;
//       name1 = req.body.dname;
//       age = req.body.age;
//       name2 = req.body.rname;
//       method = req.body.method;
//       var ds = { name: `${name1}`, age: `${age}` };
//       var rc = { name: `${name2}`, method: `${method}` };
//       dataSchema = JSON.stringify(ds);
//       routerConfig = JSON.stringify(rc);
//       status = req.body.status;
//       createdBy = req.body.created_by;
//       updatedBy = req.body.updated_by;
//       createdDate = new Date().toLocaleDateString();

//       await client.connect();

//       const res1 = await client.query(
//         `INSERT INTO datasets(id, data_schema, router_config, status, created_by, updated_by, created_date) VALUES($1, $2, $3, $4, $5, $6, $7)`,
//         [
//           id,
//           dataSchema,
//           routerConfig,
//           status,
//           createdBy,
//           updatedBy,
//           createdDate,
//           //   updatedDate,
//         ]
//       );
//       // const res2=await client.query(`UPDATE datasets SET data_schema = $1 WHERE id= $2`,[dataSchema,id]);
//       // const res3=await client.query(`DELETE FROM datasets WHERE id= $1`,[id]);

//       const updateddb = await client.query("SELECT * FROM datasets");

//       res.send(updateddb);
//       await client.end();
//       return true;
//     } catch (error) {
//       // if(error&&error.code==='23505')
//       // console.log(id +" is a Duplicate id");

//       console.log(error);
//     }
//   };
//   connectDb();
// });
var id: any;
app.put("/updateData/:id", (req: any, res: any) => {
  const connectDb = async () => {
    try {
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });
      var updatedDate: any;
      id = req.query.id;
      var name1 = req.body.dname;
      var age = req.body.age;
      var ds = { name: `${name1}`, age: `${age}` };
      var dataschema = JSON.stringify(ds);
      updatedDate = new Date().toLocaleDateString();
      await client.connect();

      const res2 = await client.query(
        `UPDATE datasets SET updated_date = $1,data_schema=$2  WHERE id= $3`,
        [updatedDate, dataschema, id]
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
