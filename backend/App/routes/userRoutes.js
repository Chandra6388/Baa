const router = require("express").Router()
const { AddToCart , allAddToCartProduct, getCartProduct , quantityIncOrDce} = require('../controllers/user/userControllers')

router.post("/addToCart", AddToCart);
router.post("/allAddToCartProduct", allAddToCartProduct);
router.post("/getCartProduct", getCartProduct);
router.post("/getCartProduct", getCartProduct);
router.post("/quantityIncOrDce", quantityIncOrDce);


module.exports = router;