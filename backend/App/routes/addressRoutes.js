const router = require("express").Router()
const { addAddress } = require('../controllers/user/addressControllers')

router.post("/addAddress", addAddress);

module.exports = router;