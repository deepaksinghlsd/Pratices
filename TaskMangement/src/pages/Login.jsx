import { useState } from "react";
import { login } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log(`loginsuffully`);
      
    } catch (error) {
      console.error(`error in login`)
    }
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email : 
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label> Password : <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
