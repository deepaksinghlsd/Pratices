import { useEffect, useState } from "react";
import { messaging, requestForToken } from "../firebase";
import { onMessage } from "firebase/messaging";

const Notification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    requestForToken();
    onMessage(messaging, (payload) => {
      setNotification(payload.notification);
    });
  }, []);

  return (
    <div>
      {notification && (
        <div>
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
};
export default Notification;
