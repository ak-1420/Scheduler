"use strict";

const mysql = require('mysql')

const dbConn = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER, 
    port:process.env.DB_PORT, 
    password:process.env.DB_PASSWORD, 
    database:process.env.DB, 
});


module.exports = dbConn;

