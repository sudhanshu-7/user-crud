const express = require("express")
const controller = require("../handlers/controllers")
const { body }= require("express-validator")

const router  = express.Router()


router.get("/",controller.getAllUsers)
router.delete("/",controller.deleteUser)
router.post("/",
body("email").isEmail(),
body("phone").isNumeric(),
body("country").isAlpha(),
body("state").isAlpha(),
body("city").isAlpha(),
controller.addUser)
router.patch("/",
body("email").isEmail(),
body("phone").isNumeric(),
body("country").isAlpha(),
body("state").isAlpha(),
body("city").isAlpha(),
controller.editUser)


module.exports = router