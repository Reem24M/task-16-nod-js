const express=require('express')
const {CheckAuth}=require('../middelware/checkAuth')
const { AddOrder,GetAllOrders,Review } = require('../controllers/ordercontroller')
const router=require('express').Router()

router.use(CheckAuth)

router.get('/',GetAllOrders)
router.post('/review_order/:id',Review)
router.post('/addorder',AddOrder)


module.exports=router