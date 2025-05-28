const router = require("express").Router()
const { deleteProduct, updateProduct, getProductById, getAllProducts, addProduct, getTopRatedProducts } = require('../controllers/admin/productControllers')

router.post("/add-product", addProduct);
router.post("/get-all-products", getAllProducts);
router.post("/get-product-byId", getProductById);
router.post("/update-product", updateProduct);
router.post("/delete-product", deleteProduct);
router.post("/get-top-rated-products", getTopRatedProducts);



module.exports = router;