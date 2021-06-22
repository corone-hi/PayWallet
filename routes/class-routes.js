const express = require('express');
const {getClass} = require('../controllers/classController');

const router = express.Router();

/*
router.post('/student', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.get('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);


*/

router.get('/crawl/:shop', getClass);


module.exports = {
    routes: router
}