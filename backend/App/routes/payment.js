const router = require("express").Router()
const { createOrder, savePayment, getAllPayment} = require('../payment/payment')

router.post("/createOrder", createOrder);
router.post("/savePayment", savePayment);
router.post("/getAllPayment", getAllPayment);




module.exports = router;