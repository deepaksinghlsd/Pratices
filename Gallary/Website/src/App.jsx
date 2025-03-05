import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Imageuplod from "./pages/Imageuplod";
import LocationPage from "./pages/LocationPage";
import GetDirectionBetwwentwoPoints from "./pages/GetDirectionBetwwentwoPoints";
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
          <Route path="/location" element={<LocationPage />} />
          <Route path="/dir" element={<GetDirectionBetwwentwoPoints />} />
          <Route path="/" element={<ProtectedRoute><Imageuplod /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
