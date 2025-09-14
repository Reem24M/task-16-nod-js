const express=require('express')
const {CheckAuth}=require('../middelware/checkAuth')
const { GetAllStudents, AddStudent, EditStudent, DeleteStudent, GetStudentById } = require('../controllers/userscontroller')
const router=require('express').Router()

router.use(CheckAuth)

router.get('/',GetAllStudents)
router.get('/student/:id',GetStudentById)
router.post('/addstudent',AddStudent)
router.post('/editstudent/:id',EditStudent)
router.delete('/delte-sutdent/:id',DeleteStudent)


module.exports=router