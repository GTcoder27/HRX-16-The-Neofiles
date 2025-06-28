import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";




const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await firebase.loginUserWithEmailAndPassword(email, password);
      navigate("/");
      toast.success("Logged in Successfully");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await firebase.signupWithGoogle();
      toast.success("Logged In");
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-In failed:");
      // alert("Google Sign-In failed: " + error.message);
    }
  };

  const handleRegister = () => {
    try {
      navigate("/signup");
    }
    catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 select-none pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-1/4 w-60 h-60 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-slate-300 text-sm">Sign in to your account</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 mb-6">
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-slate-700/70 backdrop-blur-sm text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-slate-400 transition-all duration-300 group-hover:bg-slate-700/90"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="relative group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-slate-700/70 backdrop-blur-sm text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-slate-400 transition-all duration-300 group-hover:bg-slate-700/90"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-600"></div>
              <span className="px-4 text-slate-400 text-sm">or</span>
              <div className="flex-1 border-t border-slate-600"></div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-4 rounded-xl bg-white text-gray-700 font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25 flex items-center justify-center space-x-3"
            >
              {/* Google Logo SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-3">Don't have an account?</p>
            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700/50 hover:border-slate-500 hover:text-white transition-all duration-300"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-xs">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>


  );
};

export default LoginPage;
