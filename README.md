# Scheduler
Classroom Scheduler Web App using React , MySQL , Node Js and Express Js  


# server deployed on heroku

Scheduler API’s:

deployed backedn url: https://api-classroom-scheduler.herokuapp.com/

POST:https://api-classroom-scheduler.herokuapp.com/api/v1/users/signup : to create user 

GET: https://api-classroom-scheduler.herokuapp.com/api/v1/users/signin : to fetch user with given credentials

GET: https://api-classroom-scheduler.herokuapp.com/api/v1/users : fetch all users

GET: https://api-classroom-scheduler.herokuapp.com/api/v1/users/<user-id> : fetch user with user id <user-id>

GET: https://api-classroom-scheduler.herokuapp.com/api/v1/batches :fetch all batches
  
GET: https://api-classroom-scheduler.herokuapp.com/api/v1/batches/<batch-id> : fetch batch with batch id <batch-id>

POST: https://api-classroom-scheduler.herokuapp.com/api/v1/batches : create a new batch
  
DELETE: 	https://api-classroom-scheduler.herokuapp.com/api/v1/batches/<batch-id> : delete a batch with batch id <batch-id>

GET: https://api-classroom-scheduler.herokuapp.com/api/v1/schedules :fetch all schedules
  
GET: https://api-classroom-scheduler.herokuapp.com/api/v1/schedules/<schedule-id> : fetch schedule with schedule id <schedule-id>

POST: https://api-classroom-scheduler.herokuapp.com/api/v1/schedules : create a new schedule
  
DELETE: 	https://api-classroom-scheduler.herokuapp.com/api/v1/schedules/<schedule-id> : delete a schedule with schedule id <schedule-id>


# mysql database deployed on clever cloud
  
  database schema :
  
  # batch table :
  
  
  CREATE TABLE `batch` (
  `batchId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `studentId` int(11) NOT NULL,
  PRIMARY KEY (`batchId`,`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
  # schedule table :

CREATE TABLE `schedule` (
  `scheduleId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `timings` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `batchId` int(11) NOT NULL,
  `teacherId` int(11) NOT NULL,
  PRIMARY KEY (`scheduleId`,`teacherId`,`batchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  

  # users table:
  
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

  
# front end deployed on netlify
  
  following are the frontend routes
  
  homepage : https://classroom-scheduler.netlify.app/
  signin : https://classroom-scheduler.netlify.app/signin
  signup : https://classroom-scheduler.netlify.app/signup
  
  calendar: https://classroom-scheduler.netlify.app/calendar
  batches: https://classroom-scheduler.netlify.app/batches
  teachers: https://classroom-scheduler.netlify.app/schedules
