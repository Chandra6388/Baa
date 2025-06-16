const router = require("express").Router()
const { AddToCart , allAddToCartProduct, getCartProduct , quantityIncOrDce, profile} = require('../controllers/user/userControllers')

router.post("/addToCart", AddToCart);
router.post("/allAddToCartProduct", allAddToCartProduct);
router.post("/getCartProduct", getCartProduct);
router.post("/getCartProduct", getCartProduct);
router.post("/quantityIncOrDce", quantityIncOrDce);
router.post("/profile", profile);



module.exports = router;