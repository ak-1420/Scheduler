const express = require('express')
const router = express.Router()

const batchController = require('../controllers/batch.controller')


router.get('/',batchController.findAll);
router.get('/:id',batchController.findById);


router.post('/',batchController.create);

router.delete('/',batchController.delete);

module.exports = router