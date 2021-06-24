"use strict";

var dbConn = require('../../config/db.config')

var Batch = (batch) => {
    this.batchId = batch.batchId;
    this.name = batch.name;
    this.studentId = batch.studentId;
}

Batch.create = (newBatch , result ) => {
    dbConn.query('INSERT INTO batch (batchId , name , studentId) VALUES ? ' ,[newBatch] , (err,res) => {

        if(err){
            console.log('error:' , err);
            result(err,null);
         }
         else
         {
           console.log(res);
           result(null,res);
         }

    });
};

Batch.delete = (batchId , result) => {
    dbConn.query('DELETE FROM batch WHERE batchId = ? ' , batchId , (err,res) => {
        if(err){
            console.log('error:',err);
            result(err,null);
        }
        else
        {
            console.log(res);
            result(null,res);
        }
    });
};


Batch.findAll = (result) => {
   
    dbConn.query('SELECT * FROM batch' , (err,res) => {
        if(err){
            console.log('error:',err);
            result(err,null);
        }
        else
        {
            console.log(res);
            result(null,res);
        }
    });
};

Batch.findById = (batchId,result) => {
    dbConn.query(`SELECT * FROM batch WHERE batchId = ?` , batchId ,(err,res) => {
        if(err){
            console.log('error',err);
            result(err,null);
        }
        else
        {
            console.log(res);
            result(null,res);
        }
    });
};

module.exports = Batch;