import { useEffect, useState } from "react";
import FileUploader from "../components/FileUploader";
import ImageGallery from "../components/ImageGallery";
import { messaging, onMessage } from "../firebase/firebaseConfig";
import { requestForToken } from "../firebase/messageUser";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Toast } from "../components/Toast"; // Component for showing notifications

const ImageUploader = () => {
  const [notificationPermission, setNotificationPermission] = useState("default");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [refreshGallery, setRefreshGallery] = useState(0);
  const auth = getAuth();

  // Handle authentication state to get the current user
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

  // Request notification permissions and get the token
  useEffect(() => {
    if (!currentUserId) return;

    const requestNotificationPermission = async () => {
      try {
        if ("Notification" in window) {
          const permission = await Notification.requestPermission();
          setNotificationPermission(permission);

          if (permission === "granted") {
            console.log("Notification permission granted.");
            await requestForToken(currentUserId);
          } else {
            console.warn("Notification permission denied.");
          }
        } else {
          console.warn("This browser does not support notifications.");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    requestNotificationPermission();
  }, [currentUserId]);

  // Listen for Firebase Cloud Messaging notifications
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);

      const { title, body } = payload.notification || {};
      const { fileName, eventType, fileUrl } = payload.data || {};

      const id = Date.now();

      setNotifications((prev) => [
        ...prev,
        {
          id,
          title: title || `File ${eventType}`,
          message: body || `File ${fileName} was ${eventType}.`,
          type: getNotificationType(eventType),
          timestamp: new Date(),
          data: { fileName, fileUrl, eventType },
        },
      ]);

      // Show a browser notification if granted
      if (notificationPermission === "granted") {
        new Notification(title || "File Update", { body });
      }
      
      // Refresh gallery when receiving a notification about file changes
      setRefreshGallery(prev => prev + 1);
    });

    return () => unsubscribe();
  }, [messaging, notificationPermission]);

  // Determine notification type based on event type
  const getNotificationType = (eventType) => {
    switch (eventType) {
      case "uploaded":
        return "success";
      case "updated":
        return "info";
      case "deleted":
        return "warning";
      default:
        return "info";
    }
  };

  // Remove a notification from state
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Handle gallery actions (delete, update)
  const handleGalleryAction = (action, fileName, filePath) => {
    const id = Date.now();
    
    setNotifications((prev) => [
      ...prev,
      {
        id,
        title: `File ${action}`,
        message: `File ${fileName} was ${action} successfully.`,
        type: getNotificationType(action === "updated" ? "updated" : "deleted"),
        timestamp: new Date(),
        data: { fileName, filePath, eventType: action },
      },
    ]);

    // Show a browser notification if granted
    if (notificationPermission === "granted") {
      new Notification(`File ${action}`, { 
        body: `File ${fileName} was ${action} successfully.` 
      });
    }
  };

  return (
    <div className="w-full relative">
      {/* Notification container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            title={notification.title}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      

      {notificationPermission !== "granted" && (
        <div className="notification-warning p-4 bg-yellow-100 border-l-4 border-yellow-500 mb-4">
          <p>Enable notifications for upload alerts</p>
          <button
            onClick={() =>
              Notification.requestPermission().then((permission) => {
                setNotificationPermission(permission);
                if (permission === "granted" && currentUserId) {
                  requestForToken(currentUserId);
                }
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Enable Notifications
          </button>
        </div>
      )}

      {/* File upload component */}
      <FileUploader onUploadSuccess={(fileName) => {
        const id = Date.now();
        setNotifications((prev) => [
          ...prev,
          {
            id,
            title: "Upload Successful",
            message: `File ${fileName} has been uploaded successfully.`,
            type: "success",
            timestamp: new Date(),
          },
        ]);
        
        // Trigger gallery refresh after upload
        setRefreshGallery(prev => prev + 1);
      }} />

      {/* Image gallery component with refresh trigger and action callbacks */}
      <ImageGallery 
        refreshTrigger={refreshGallery} 
        onDeletePerformed={(fileName, filePath) => handleGalleryAction("deleted", fileName, filePath)}
        onUpdatePerformed={(fileName, filePath) => handleGalleryAction("updated", fileName, filePath)}
      />
    </div>
  );
};

export default ImageUploader;