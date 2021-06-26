"use strict";

const mysql = require('mysql')

const dbConn = mysql.createPool({
    host: 'btnicthwdmin7xsfo3fq-mysql.services.clever-cloud.com',
    user:'ufecatchyxd2rme1',
    port:'3306',
    password:'sCLxgovH9cgLQNUr5zly',
    database:'btnicthwdmin7xsfo3fq'
});


dbConn.connect( (error) => {
    if(error){
        console.log('error when connecting to database:',error)
    }
    else
    console.log('Datebase Connected!');
})

module.exports = dbConn;

