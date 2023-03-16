const { Client } = require('pg')
const client = new Client({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5433,
});

client.connect().then(() => {
  client.query('SELECT NOW()', (err:any, res:any) => {
    console.log(res.rows)
    client.end()
  });
});
