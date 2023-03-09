

const dotenv=require('dotenv');
const Logger = require('nodemon/lib/utils/log');
dotenv.config();
var pg = require("pg");
var {Client}=require("pg");

// var conString = "postgres://user1:JER@ALD@localhost:5432/student";
// var client = new pg.Client(conString);



const connectDb = async () => {
    // try {
            const pool = new Client({
                user: 'user1',
                host: 'localhost',
                database: 'student',
                password: 'JER@ALD',
                port: 5432,
        })

        await pool.connect()
        const res = await pool.query("INSERT INTO students(name, phno, address) VALUES('John', 5, 'Bngalore')");

        console.log(res)
//         client.connect();
//         var x = 1000;

// while (x > 0) {
//     // client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
//     client.query("INSERT INTO students(name, phno, address) values($1, $2, $3)", ['John', 5, 'Bngalore']);
//     x = x - 1;
// }
        await pool.end()
    // } catch (error) {
    //     console.log("cannot connect");

    // }
}
connectDb()
