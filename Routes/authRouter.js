const { login } = require('../controllers/logincontroller')

const { register } = require('../controllers/registercontroller')
const { CheckAuth } = require('../middelware/checkAuth')

const router=require('express').Router()
router.use(CheckAuth)
router.post('/resgister',register)
router.post('/login',login)



module.exports=router