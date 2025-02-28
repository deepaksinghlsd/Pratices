import { useEffect, useState } from "react";

export function Toast({ title, message, type = "info", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 200); // Allow fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-md shadow-lg text-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getStyles()}`}
    >
      {type === "success" && "✅"}
      {type === "error" && "❌"}
      {type === "warning" && "⚠️"}
      {type === "info" && "ℹ️"}
      <span>{message}</span>
    </div>
  );
}
