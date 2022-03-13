const mysql = require("mysql");
// require('dotenv').config();

var db_config = {
  connectionLimit: 10,

  user: process.env.DATABASE_USERNAME,
  host: "remotemysql.com",
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_USERNAME,
};

var db = mysql.createPool(db_config);

module.exports = db;
