import { useEffect, useState } from "react";
import FileUploader from "../components/FileUploader";
import ImageGallery from "../components/ImageGallery";
import { messaging, onMessage } from "../firebase/firebaseConfig";
import { requestForToken } from "../firebase/messageUser";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ImageUpload = () => {
  const [notificationPermission, setNotificationPermission] = useState("default");
  const [currentUserId, setCurrentUserId] = useState(null);
  const auth = getAuth();

  // Handle auth state to get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });
    
    return () => unsubscribe();
  }, [auth]);

  // Request notification permissions and get token
  useEffect(() => {
    if (!currentUserId) return; // Don't proceed if no user is logged in

    const requestNotificationPermission = async () => {
      try {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          setNotificationPermission(permission);
          
          if (permission === "granted") {
            console.log("Notification permission granted.");
            // Call your token generation function with the user ID
            await requestForToken(currentUserId);
          } else {
            console.warn("Notification permission denied.");
          }
        } else {
          console.warn("This browser does not support notifications");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    requestNotificationPermission();
  }, [currentUserId]);

  // Set up message listener
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      if (payload.notification?.body) {
        // Display notification using the Notification API
        if (notificationPermission === "granted") {
          const { title, body } = payload.notification;
          new Notification(title || "New Notification", { body });
        } else {
          // Fallback for when notifications aren't allowed
          alert(payload.notification.body);
        }
      }
    });

    return () => {
      unsubscribe(); // Clean up listener on unmount
    };
  }, [messaging, notificationPermission]);

  return (
    <div className="w-full">
      <h1>Firebase File Upload</h1>
      {notificationPermission !== "granted" && (
        <div className="notification-warning">
          <p>Enable notifications for upload alerts</p>
          <button 
            onClick={() => Notification.requestPermission().then(permission => {
              setNotificationPermission(permission);
              if (permission === "granted" && currentUserId) {
                requestForToken(currentUserId);
              }
            })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enable Notifications
          </button>
        </div>
      )}
      <FileUploader onUploadSuccess={() => console.log("Upload Successful!")} />
      <ImageGallery />
    </div>
  );
};

export default ImageUpload;