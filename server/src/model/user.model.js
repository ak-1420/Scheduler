"use strict";

var dbConn = require('../../config/db.config')

//user object creation

var User = (user) => {

    this.email = user.email;

    this.password = user.password;

    this.type = user.type;
};

// to register users
User.create = (newUser , result) => {
    dbConn.query('INSERT INTO users set ?' , newUser , (err,res) => {
     
        if(err){
           console.log('error:' , err);
           result(err,null);
        }
        else
        {
          console.log(res.insertId);
          result(null,res.insertId);
        }

    });
};

// to login
User.signInWithEmailAndPassword = (user,result) => {
  dbConn.query('SELECT * FROM users where email = ? AND password = ?', [user.email , user.password] , (err , res) => {
          if(err){
              console.log('error : ',err);
              result(err,null);
          }
          else{
              console.log(res);
              result(null,res);
          }
  });
};




module.exports = User;