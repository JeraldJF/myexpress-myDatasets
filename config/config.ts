

// const configure = {
//   user: process.env.DB_USER,
//   host:process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password:process.env.DB_PASS,
//   port: process.env.DB_PORT,
// };
const configure = {
  // port: 5432,
  // user: "user1",
  // host:"pgdeploy-postgresql.default.svc.cluster.local",
  // database: "datasets",
  // password:"JER@ALD",
  user: "user1",
  host:"localhost",
  database: "datasets",
  password:"JER@ALD",
  port: 5432,
};

export default configure;
