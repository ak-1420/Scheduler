"use strict";

const mysql = require('mysql')

// local db connection

const dbConn = mysql.createPool({
    host: 'btnicthwdmin7xsfo3fq-mysql.services.clever-cloud.com',
    user:'ufecatchyxd2rme1',
    port:'3306',
    password:'sCLxgovH9cgLQNUr5zly',
    database:'btnicthwdmin7xsfo3fq'
});



module.exports = dbConn;

