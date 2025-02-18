const mongoose = require ("mongoose")
const DbCoonection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log("DB connected");
    }
    catch{
        console.error(e)
        console.log("Error")
        process.exit(1)
    }

}
module.exports = DbCoonection;