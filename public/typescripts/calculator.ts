// const express=require('express');
// const app=express();
// const port=3000
// const bodyParser=require('body-parser');
// const fs=require("fs");
// const dotenv=require('dotenv');
// dotenv.config()
// const { Client } = require("pg");

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req: any, res: any) => {
//   res.send("hello");
// });

// app.delete("/getInfo", (req: any, res: any) => {
//   var name1: string;
//   var phoneno: number;
//   var address1: string;
//   var id = 17;

//   fs.readFile(
//     __dirname + "/" + "jsonfile.json",
//     "utf8",
//     function (err: any, data: any) {
//       // console.log(data);
//       const obj2 = JSON.parse(data);
//       name1 = obj2.name.toString();
//       phoneno = Number(obj2.phone);
//       address1 = obj2.address.toString();
//     }
//   );
//   const connectDb = async () => {
//     try {
//       const client = new Client({
//         user: "user1",
//         host: "localhost",
//         database: "student",
//         password: "JER@ALD",
//         port: 5432,
//       });

//       await client.connect();

//       // const res1 = await client.query(`INSERT INTO students(name, phno, address) VALUES($1, $2, $3)`,[name1,phoneno,address1]);
//       // const res2=await client.query(`UPDATE STUDENTS SET "address" = $1 WHERE "name"= $2`,[address1,name1]);
//       const res3 = await client.query(`DELETE FROM STUDENTS WHERE id= $1`, [
//         id,
//       ]);

//       const updateddb = await client.query("SELECT * FROM students");
//       // const jsonf=JSON.stringify(updateddb);
//       // console.log(res)
//       // res.send("Data Added " + jsonf);

//       res.send(updateddb);
//       await client.end();
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   connectDb();
// });

// app.listen(port, () => {
//   console.log(`port number ${port} is working`);
// });
