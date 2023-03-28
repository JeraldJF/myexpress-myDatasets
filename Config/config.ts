

const configure = {
  user: process.env.DB_USER,
  host:process.env.DB_HOST||"localhost",
  database: process.env.DB_NAME,
  password:process.env.DB_PASS,
  port: process.env.DB_PORT,
};

export default configure;
