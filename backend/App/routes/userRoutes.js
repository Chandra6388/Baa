const router = require("express").Router()
const { AddToCart , allAddToCartProduct, getCartProduct} = require('../controllers/user/userControllers')

router.post("/addToCart", AddToCart);
router.post("/allAddToCartProduct", allAddToCartProduct);
router.post("/getCartProduct", getCartProduct);


module.exports = router;