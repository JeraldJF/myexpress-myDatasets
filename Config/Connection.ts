const {Pool}=require('pg');

var pool= new Pool({
    user: "user1",
    host: "localhost" || process.env.HOST ,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
  });
  pool.connect();
  

export default pool;
  
