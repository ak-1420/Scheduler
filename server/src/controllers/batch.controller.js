'use strict'

const e = require('express');
const Batch = require('../model/batch.model')

exports.create = (req,res) => {
    console.log(req);
    const newBatch = req.body.batchList
    console.log(newBatch,'from server')
    if(req.body.constructor === Object &&
        Object.keys(req.body).length === 0){
          res.status(400).send({
              error:true,
              message:'Please provide all required fields'
          });
    }
    else
    {
        Batch.create(newBatch,(error , result)=>{
            if(error) res.send(error);
            else{
                res.json({
                    error:false,
                    message:'Batch created successfully!',
                    data:result
                });
            }
        });
    }
};

exports.delete = (req,res) => {
    const batchId = req.body.batchId

    if(req.body.constructor === Object &&
        Object.keys(req.body).length === 0){
          res.status(400).send({
              error:true,
              message:'Please provide all required fields'
          });
    }
    else
    {
        Batch.delete(batchId,(error,result) => {

             if(error) res.send(error)

             else
             {
                 res.json({
                     error:false,
                     message:`Batch with id ${batchId} deleted succesfully!`,
                     data:result
                 });
             }
        });
    }
};


exports.findAll = (req,res) => {
      
       Batch.findAll((error,result) => {
           if(error) {
               console.log('error:',error)
            res.send(error);
           }
           else
           {
               console.log('success:',result)
               res.json({
                   error:false,
                   message:'Batch records fetched successfully!',
                   data:result
               });
           }
       });
};

exports.findById = (req,res) => {
    const batchId = req.params.id

    Batch.findById(batchId,(error,batch) => {
        if(error){
            console.log(error);
            res.send(error);
        }
        else
        {
            console.log('success:',res);
            res.json({
              error:false,
              message:`Batch ${batchId} fetched successfully!`,
              data:batch
            });
        }
    });
};
