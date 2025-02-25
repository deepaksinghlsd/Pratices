import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc, collection, query, where, onSnapshot } from "firebase/firestore";

const MessageList = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [sendMessages, setSendMessage] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Real-time listener for received messages
    const q = query(collection(db, "messages"), where("recipientId", "==", userId));
    
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);

      // Update status to "read" for unread messages
      fetchedMessages.forEach(async (message) => {
        if (message.status !== "read") {
          await updateDoc(doc(db, "messages", message.id), { status: "read" });
        }
      });
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // Real-time listener for sent messages
    const q = query(collection(db, "messages"), where("senderId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSendMessage(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-bold">Messages</h2>
      {messages.map((msg) => (
        <div key={msg.id} className="p-2 border rounded my-2">
          <p>{msg.message}</p>
        </div>
      ))}

{sendMessages.map((msg) => (
  <div key={msg.id} className="p-2 border rounded my-2 flex justify-end">
    <div className="bg-blue-100 p-2 rounded-lg text-right max-w-xs ml-auto">
      <p>{msg.message}</p>
      <small className="block text-gray-500">{msg.status}</small>
    </div>
  </div>
))}

    </div>
  );
};

export default MessageList;
