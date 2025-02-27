import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Imageuplod from "./pages/Imageuplod";
import { getMessaging, onMessage } from "firebase/messaging";


const App = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log(payload);
    alert(`${payload.notification.title}: ${payload.notification.body}`);
  })
 
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Imageuplod /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
