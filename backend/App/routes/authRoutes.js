const router = require("express").Router()
const { login , register , update } = require('../controllers/auth/authController')

router.post("/login", login);
router.post("/register", register);
router.post("/update", update);



module.exports = router;