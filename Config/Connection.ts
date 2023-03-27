const {Pool}=require('pg');

var pool= new Pool({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5432,
  });
  pool.connect();
  

export default pool;

// env-cmd -f ./Config/dev.env 
// host: "localhost" || process.env.HOST ,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
  
