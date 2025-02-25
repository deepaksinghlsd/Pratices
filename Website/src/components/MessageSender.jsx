import { useState } from "react";
import axios from "axios";

const MessageSender = ({ senderId }) => {
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    console.log("Sending from:", senderId, "To:", recipientId);
    
    try {
      await axios.post("https://sendmessage-b5hihlfyda-uc.a.run.app/", {
        senderId,
        recipientId,
        message,
      });
      alert("Message sent successfully.");
    } catch (error) {
      alert("Error sending message:", error);
    }
    setMessage("")
    
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Send Message
      </button>
    </div>
  );
};

export default MessageSender;
