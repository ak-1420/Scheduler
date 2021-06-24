"use strict";

const User = require('../model/user.model')

exports.create = (req,res) => {
  
    //const user = new User(req.body);

     const new_user = req.body

    // handling null errors
    if(req.body.constructor === Object &&
        Object.keys(req.body).length === 0){
          res.status(400).send({
              error:true,
              message:'Please provide all required fields'
          });
    }
    else
    {
        User.create(new_user,(err,resultUser) => {
            if(err) res.send(err);

            else
            {
                res.json({
                    error:false,
                    message:'User registered successfully!',
                    data:resultUser
                });
            }
            


        });
    }
};

exports.signInWithEmailAndPassword = (req , res) => {


    const user = req.body


    //handle null values
    if(req.body.constructor === Object &&
        Object.keys(req.body).length === 0){
          res.status(400).send({
              error:true,
              message:'Please provide all required fields'
          });
    }

    else
    {
        User.signInWithEmailAndPassword(user,(err,resultUser) => {
            if(err) res.send(err);

            if(resultUser.length > 0)
            {
                res.json({
                error:false,
                status:'login-success',
                message:'User logged in successfully!',
                data:resultUser
                });
            }
            else
           { 
               res.json({
                error:false,
                status:'no-user-exists',
                message:'no user exists!',
                data:resultUser
            });
          }
        });
    }
};


exports.findAll = (req,res) => {

    User.findAll((error,users) => {
        if(error){
            console.log('error:',error);
            res.send(error)
        }
        else
        {
            res.json({
                error:false,
                message:'users fetched successfully!',
                data:users
            });
        }
    });
};


exports.findById = (req,res) => {
    const userId = req.params.id

    User.findById(userId,(error,user) => {
        if(error){
            console.log('error:',error)
            res.send(error)
        }
        else{
            console.log('success:',res);
            res.json({
               error:false,
               message:`user with id: ${userId} fetched successfully!`,
               data:user
            });
        }
    });
};


