const express = require("express")
const router = express.Router();
const {SignUp , login , logOut} = require("../controller/Logincontroller")

router.post("/Signup" , SignUp);
router.post ("/login", login);
router.post("/logout", logOut);

module.exports = router