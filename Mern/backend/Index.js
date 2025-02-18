const express = require("express");
const app = express();
require("dotenv").config()
const router = require("./router/UserRouter")
const Dbconnectin = require("./config/Dbconeection")
Dbconnectin()
app.use(express.json())
app.use("/api", router)
const PORT =process.env.PORT
app.listen(PORT , ()=>
console.log(`server is running on port ${PORT}`));