import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Lightbulb, Upload, Sparkles, Star, Share, Loader, Zap, Code, Palette, Rocket } from 'lucide-react';



const HomePage = () => {
  const { logout,authUser } = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-y-hidden w-[100%]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="mt-16 lg:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
              <p className="text-gray-400 text-lg">Powered by cutting-edge AI to accelerate your learning journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Star,
                  title: "Smart AI Suggestions",
                  description: "Advanced algorithms analyze your interests and skill level to suggest perfect projects",
                  gradient: "from-yellow-400 to-orange-500"
                },
                {
                  icon: Lightbulb,
                  title: "Comprehensive Guides",
                  description: "Step-by-step instructions, templates, and resources for every project level",
                  gradient: "from-purple-400 to-pink-500"
                },
                {
                  icon: Share,
                  title: "Multi-Domain Learning",
                  description: "Explore web development, AI/ML, mobile apps, data science, and much more",
                  gradient: "from-cyan-400 to-blue-500"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center mt-8">
          <button
            onClick={() => navigate('/ai')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
          >
            Transform ideas into reality
          </button>
        </div>
          
  
        <style jsx='true'>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
        `}</style>


        
  
          
        </div>
      </div>
    );
};

export default HomePage;
      
