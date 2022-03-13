const mysql = require("mysql");
// require('dotenv').config();

var db_config = {
    connectionLimit : 10,

 user:"b5X2l394qY",
           host:"remotemysql.com",
           password:"YJgzFpNOr7",
           database:"b5X2l394qY",

   };

var db=mysql.createPool(db_config);



module.exports =  db;