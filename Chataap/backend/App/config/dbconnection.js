const mongoose = require("mongoose")
require("dotenv").config();

const DBConnection = () =>{
    mongoose.connect(process.env.mongooseURL , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}
module.exports = DBConnection;