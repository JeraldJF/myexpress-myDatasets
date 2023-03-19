import {Pool}  from "pg";
var pool= new Pool({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5432,
  });

export default pool;
  
