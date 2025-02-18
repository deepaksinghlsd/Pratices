const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
    sender: {
      type: String,
      
    },
  receiver: String,
  content: String,
  type: String, // text, file, image
  timestamp: Date
})

const Message = mongoose.model("Message" , MessageSchema)