// // import { json } from "stream/consumers";

// const express = require('express')
// const app = express()
// const port=3000
// const fs=require('fs');

// // var user = {
// //     "user5": {
// //         "id":5,
// //         "firstname":"Liudmyla",
// //         "lastname":"Nagorna",
// //         "email":"mila@gmail.com"
// //       },
// // } 


// app.get('/', function(req:any, res:any){
//     fs.readFile(__dirname + "/" + "jsonfile.json", 'utf8', function(err:any, data:any){
//         // console.log(data.name.toString());
//         const obj1=JSON.parse(data);
//         res.send("data is"+obj1.name.toString());
//     });
//     // res.sendFile(__dirname+"/jsonfile.json");
// })




app.listen(port,() => {
    if(!port)
    console.log('error!!');
    else
    console.log(`Example app listening on port ${port}`);
  
})






// // const { Client } = require('pg');

// // const client = new Client({
// //     host: '127.0.0.1',
// //     user: 'Jerry',
// //     database: 'template1',
// //     password: 'Jerry23@#',
// //     port: 5432,
// // });

// // const insertUser = async (userName:string, phoneno:number, place:string) => {
// //     try {
// //         await client.connect();           // gets connection
// //         await client.query(
// //             `INSERT INTO "students" ("name", "phno", "address)  
// //              VALUES ($1, $2, $3)`, [userName, phoneno, place]); // sends queries
// //         return true;
// //     } catch (error:any) {
// //         console.error(error.stack);
// //         return false;
// //     } finally {
// //         await client.end();               // closes connection
// //     }
// // };

// // insertUser('Matt', 6778, 'mANGAORE').then(result => {
// //     if (result) {
// //         console.log('User inserted');
// //     }
// // });

