import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await firebase.loginUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await firebase.signupWithGoogle();
      navigate("/");
    } catch (error) {
      alert("Google Sign-In failed: " + error.message);
    }
  };

  const handleRegister = ()=>{
    try{
      navigate("/signup");
    }
    catch (error) {
      alert( error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-lg w-[300px]">
      <h1 className="text-xl font-bold text-white">Login Page</h1>
      <input
        type="email"
        className="p-2 rounded bg-gray-700 text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="p-2 rounded bg-gray-700 text-white"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
      <button
        onClick={handleGoogleLogin}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Login with Google
      </button>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default LoginPage;
