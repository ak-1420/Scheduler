"use strict";

const mysql = require('mysql')

// local db connection

const dbConn = mysql.createConnection({
    host: 'btnicthwdmin7xsfo3fq-mysql.services.clever-cloud.com',
    user:'ufecatchyxd2rme1',
    port:'3306',
    password:'sCLxgovH9cgLQNUr5zly',
    database:'btnicthwdmin7xsfo3fq'
});

dbConn.connect( (error) => {
    if(error) throw error;
    console.log('Datebase Connected!');
})

module.exports = dbConn;

