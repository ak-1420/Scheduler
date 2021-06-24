'use strict'

var Schedule = require('../model/schedule.model')

exports.create = (req,res) => {

    const newSchedule = req.body

    if(req.body.constructor === Object &&
        Object.keys(req.body).length === 0){
          res.status(400).send({
              error:true,
              message:'Please provide all required fields'
          });
    }
    else
    {
        Schedule.create(newSchedule,(error , result)=>{
            if(error) res.send(error);
            else{
                res.json({
                    error:false,
                    message:'Schedule created successfully!',
                    data:result
                });
            }
        });
    }
};


exports.delete = (req,res) => {
        const batchId = req.body.batchId
        const scheduleId = req.body.scheduleId
        const teacherId = req.body.teacherId
    
        if(req.body.constructor === Object &&
            Object.keys(req.body).length === 0){
              res.status(400).send({
                  error:true,
                  message:'Please provide all required fields'
              });
        }
        else
        {
            Schedule.delete(scheduleId ,batchId ,teacherId,(error,result) => {
    
                 if(error) res.send(error)
    
                 else
                 {
                     res.json({
                         error:false,
                         message:`Scheduler with id ${scheduleId} deleted succesfully!`,
                         data:result
                     });
                 }
            });
        }
};
    
exports.findAll = (req,res) => {
      
    Schedule.findAll((error,result) => {
        if(error) {
            console.log('error:',error)
         res.send(error);
        }
        else
        {
            console.log('success:',result)
            res.json({
                error:false,
                message:'Schedule records fetched successfully!',
                data:result
            });
        }
    });
};

exports.findById = (req,res) => {
 const scheduleId = req.params.id

 Schedule.findById(scheduleId,(error,schedule) => {
     if(error){
         console.log(error);
         res.send(error);
     }
     else
     {
         console.log('success:',res);
         res.json({
           error:false,
           message:`Schedule ${scheduleId} fetched successfully!`,
           data:schedule
         });
     }
 });
};