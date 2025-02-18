import { useState } from "react";
import { signUp } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <label> Email: <input type="email"  onChange={(e) => setEmail(e.target.value)} /> </label>
      <label>Password: <input type="password" onChange={(e) => setPassword(e.target.value)} /> </label>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
