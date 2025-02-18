import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/loginpage"
import SignupPage from "./Pages/signuppage"
import ChatPage from "./Pages/chatpage"
const App = () => {
  return (
    <>
         <Router>
      <Routes>
       <Route path="/" element={<SignupPage/>} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/chat" element={<ChatPage />} />
     </Routes>
   </Router>
    </>
  )
}

export default App