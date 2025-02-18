const express = require("express");
const { signup, login } = require("../controllers/authcontrollers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/home" , (req, res)=>{
    res.send("Welcome to home page");
})

module.exports = router;