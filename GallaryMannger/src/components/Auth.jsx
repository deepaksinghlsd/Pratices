import { useState } from "react";
import { auth, googleProvider, registerWithEmail, loginWithEmail } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const register = async () => {
    await registerWithEmail(email, password);
  };

  const login = async () => {
    await loginWithEmail(email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
      {auth.currentUser ? (
        <button onClick={logout} className="w-full py-2 bg-red-500 text-white rounded-lg">Logout</button>
      ) : (
        <>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-2" />
          <button onClick={register} className="w-full py-2 bg-blue-500 text-white rounded-lg mt-2">Register</button>
          <button onClick={login} className="w-full py-2 bg-green-500 text-white rounded-lg mt-2">Login</button>
          <button onClick={loginGoogle} className="w-full py-2 bg-yellow-500 text-white rounded-lg mt-2">Login with Google</button>
        </>
      )}
    </div>
  );
};
export default Auth;