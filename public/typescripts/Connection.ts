const {Pool}=require("pg");

const pool1 = new Pool({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5432,
  });

  


export default pool1;