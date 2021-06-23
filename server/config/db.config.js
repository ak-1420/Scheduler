"use strict";

const mysql = require('mysql')

// local db connection

const dbConn = mysql.createConnection({
    host : 'localhost',
    user: 'react_dev',
    password:'reactDEV1420',
    database :'scheduler'
});

dbConn.connect( (error) => {
    if(error) throw error;
    console.log('Datebase Connected!');
})

module.exports = dbConn;

