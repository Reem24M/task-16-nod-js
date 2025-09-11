const { login } = require('../controllers/logincontroller')
const { logout } = require('../controllers/logoutcontroller')
const { register } = require('../controllers/registercontroller')
const { CheckAuth } = require('../middelware/checkAuth')

const router=require('express').Router()
// router.use(CheckAuth)
router.post('/resgister',register)
router.post('/login',login)
router.post('/logout',logout)


module.exports=router