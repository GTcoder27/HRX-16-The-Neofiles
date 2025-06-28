import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    firebase.signupUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        toast.success("Account created successfully");
        console.log("Signup Successful!", userCredential);
      })
      .catch((error) => {
        toast.error("Account Already Existed");
        console.error("Signup Error:", error.code, error.message);
      });
  };

  const handleSignupWithGoogle = () => {
    firebase.signupWithGoogle()
      .then((userCredential) => {
        console.log("Signup Successful!", userCredential);
        toast.success("Account Created successfully");
      }).catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = ()=>{
    try{
      navigate("/login");
    }
    catch (error) {
      alert( error.message);
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative w-full">
      
      {/* Animated/Gradient Backgrounds */}
      <div className="absolute inset-0 -z-10 select-none pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        <div className="bg-slate-800 bg-opacity-80 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Sign Up</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 py-3 mb-4 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 mb-6 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
          />
          <button
            onClick={handleSignup}
            className="w-full py-3 mb-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignupWithGoogle}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold hover:from-red-700 hover:to-pink-700 transition"
          >
            Sign Up with Google
          </button>
          <button onClick={handleLogin} className="w-full p-3 mt-6 bg-black-500 text-white rounded hover:bg-black-600">Login</button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;