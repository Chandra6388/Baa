const router = require("express").Router()
const { AddToCart } = require('../controllers/user/userControllers')

router.post("/addToCart", AddToCart);


module.exports = router;