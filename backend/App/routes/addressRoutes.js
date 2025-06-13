const router = require("express").Router()
const { addAddress, getAddress } = require('../controllers/user/addressControllers')

router.post("/addAddress", addAddress);
router.post("/getAddress", getAddress);


module.exports = router;