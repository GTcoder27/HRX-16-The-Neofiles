import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Centered Login Card */}
      <div className="relative z-10 flex justify-center items-center min-h-[80vh]">
        <div className="flex flex-col gap-5 p-8 rounded-2xl shadow-2xl w-[340px] backdrop-blur-xl border border-white/10 bg-white/10 bg-gradient-to-br from-white/10 via-purple-700/20 to-cyan-700/20">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 text-center drop-shadow-lg">Login</h1>
          <input
            type="email"
            className="p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition w-full shadow-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition w-full shadow-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="p-3 w-full rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:from-cyan-400 hover:to-blue-600 transition"
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
      </div>
    </div>
  );
};

export default LoginPage;
