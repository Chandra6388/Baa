const router = require("express").Router()
const { createOrder, savePayment} = require('../payment/payment')

router.post("/createOrder", createOrder);
router.post("/savePayment", savePayment);



module.exports = router;