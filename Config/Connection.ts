const {Pool}=require('pg');
var pool= new Pool({
    user: "user1",
    host: "host.docker.internal",
    database: "datasets",
    password: "JER@ALD",
    port: 5432,
  });
  pool.connect();
  

export default pool;
  
