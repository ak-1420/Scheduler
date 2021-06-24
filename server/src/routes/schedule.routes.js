const express = require('express')
const router = express.Router()

const scheduleController = require('../controllers/schedule.controller')

//create a new schedule
router.post('/',scheduleController.create);

//delete a schedule
router.delete('/',scheduleController.delete);

//fetch schedules
router.get('/',scheduleController.findAll);
router.get('/:id',scheduleController.findById);


module.exports = router