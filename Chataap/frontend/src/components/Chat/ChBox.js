import  { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessages((prev) => [...prev, { message }]);
    setMessage("");
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded h-64 overflow-y-scroll">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-blue-200 rounded my-2">
            {msg.message}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;