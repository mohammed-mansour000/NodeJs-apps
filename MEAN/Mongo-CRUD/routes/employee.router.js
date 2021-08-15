const express = require('express');
const router = express.Router();

const empController = require('../controllers/employee.controller');

router.get('/list', empController.getEmployeeList);

router.post('/', empController.addOrEditEmployee);

router.get('/:id', empController.getOneEmployee);

router.get('/delete/:id', empController.deleteEmployee);

module.exports = router;