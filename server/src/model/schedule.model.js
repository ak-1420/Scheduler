"use strict";

var dbConn = require('../../config/db.config')

var Schedule = (schedule) => {
    this.scheduleId = schedule.scheduleId;
    this.title = schedule.title;
    this.timings = schedule.timings;
    this.date = schedule.date;
    this.batchId = schedule.batchId;
    this.teacherId = schedule.teacherId;
};

Schedule.create = (newSchedule , result) => {

    dbConn.query('INSERT INTO schedule SET ? ' ,newSchedule , (err,res) => {

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

Schedule.delete = (scheduleId ,batchId,teacherId, result) => {

    dbConn.query('DELETE FROM schedule WHERE scheduleId = ? AND batchId = ? AND teacherId = ?' ,[scheduleId , batchId ,teacherId], (err,res) => {
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

Schedule.findAll = (result) => {
   
    dbConn.query('SELECT * FROM schedule' , (err,res) => {
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

Schedule.findById = (scheduleId,result) => {
    dbConn.query(`SELECT * FROM schedule WHERE scheduleId = ?` , scheduleId ,(err,res) => {
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


module.exports = Schedule;