const router = require("express").Router()
const { createOrder} = require('../payment/payment')

router.post("/createOrder", createOrder);


module.exports = router;