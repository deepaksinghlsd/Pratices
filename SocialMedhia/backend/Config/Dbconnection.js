const mongoose = require("mongoose");

require("dotenv").config();

const DBConnection = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then( ()=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log(err);
        process.exit(1)
    })
}

module.exports=DBConnection;