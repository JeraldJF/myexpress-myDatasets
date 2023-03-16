var Client = require('pg').Client;
var client = new Client({
    user: "user1",
    host: "localhost",
    database: "datasets",
    password: "JER@ALD",
    port: 5433
});
client.connect().then(function () {
    client.query('SELECT NOW()', function (err, res) {
        console.log(res.rows);
        client.end();
    });
});
