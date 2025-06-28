import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Lightbulb, Upload, Sparkles, Star, Share, Loader, Zap, Code, Palette, Rocket, Brain, Target, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const { logout, authUser } = useFirebase();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-y-auto w-[100%]">
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
      
      <div className="relative z-10 px-4 py-8">
        {/* Hero Problem Statement - NEW */}
        <div className="text-center mb-12 mt-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              From Learning to Building
            </h1>
            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-8">
              <p className="text-xl lg:text-2xl text-gray-200 mb-4">
                <span className="font-bold text-purple-300">Just finished a great tutorial?</span> 
              </p>
              <p className="text-lg text-gray-300 italic">
                "I'm motivated to build something, but what should I create? Where do I even start?"
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <ArrowRight className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-300 font-medium">We solve this exact problem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Section - ENHANCED */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Turn Learning Into Building</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">AI-powered project generation that adapts to your skill level and transforms any concept into hands-on practice</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Concept-to-Project AI",
                description: "Paste a video transcript, share course notes, or just mention a topic - our AI instantly generates personalized project ideas",
                gradient: "from-purple-400 to-pink-500",
                features: ["Video transcript analysis", "Course note processing", "Topic-based suggestions"]
              },
              {
                icon: Target,
                title: "Skill-Matched Complexity",
                description: "Projects automatically adapted to your background and experience level - never too easy, never impossibly hard",
                gradient: "from-blue-400 to-cyan-500",
                features: ["Beginner-friendly options", "Advanced challenges", "Progressive difficulty"]
              },
              {
                icon: Code,
                title: "Multi-Domain Projects",
                description: "Build across coding, hardware, design, research, and more with step-by-step templates and guided hints",
                gradient: "from-green-400 to-emerald-500",
                features: ["Web development", "Hardware & IoT", "AI/ML projects"]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 group relative overflow-hidden"
              >
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all relative z-10`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 text-center relative z-10">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed mb-6 relative z-10">
                  {feature.description}
                </p>
                
                {/* Feature bullets */}
                <div className="space-y-2 relative z-10">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section - NEW */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three simple steps from concept to creation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: BookOpen,
                title: "Share Your Learning",
                description: "Tell us what you just studied - paste video transcripts, course notes, or just mention the topic",
                color: "from-blue-400 to-cyan-500"
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Analyzes & Suggests",
                description: "Our AI understands your level and generates personalized project ideas tailored to your interests",
                color: "from-purple-400 to-pink-500"
              },
              {
                step: "03",
                icon: Rocket,
                title: "Start Building",
                description: "Get templates, step-by-step guides, and hints to turn your ideas into working projects",
                color: "from-green-400 to-emerald-500"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 group h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white/20">{step.step}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector arrow for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Project Examples - NEW */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-gray-400 text-lg">Real examples of concept-to-project transformations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                input: "Just learned React Hooks from a YouTube tutorial",
                output: "Build a habit tracker with useEffect for persistence and useState for real-time updates",
                domain: "Web Development",
                icon: Code,
                color: "from-blue-400 to-cyan-500"
              },
              {
                input: "Finished ML course chapter on image classification",
                output: "Create a plant disease detector using your phone camera with step-by-step TensorFlow guide",
                domain: "AI/ML",
                icon: Brain,
                color: "from-purple-400 to-pink-500"
              }
            ].map((example, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${example.color} rounded-xl flex items-center justify-center`}>
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white">{example.domain}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-2">LEARNING INPUT:</p>
                    <p className="text-gray-200 bg-black/20 rounded-xl p-4 border border-white/10">
                      "{example.input}"
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-2">AI PROJECT SUGGESTION:</p>
                    <p className="text-white bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl p-4 border border-white/20">
                      {example.output}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Domains - NEW */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Build Across All Domains</h2>
            <p className="text-gray-400 text-lg">From coding to hardware, design to research - we've got you covered</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Web Development", icon: Code, color: "from-blue-400 to-cyan-500" },
              { name: "Hardware & IoT", icon: Zap, color: "from-yellow-400 to-orange-500" },
              { name: "UI/UX Design", icon: Palette, color: "from-pink-400 to-rose-500" },
              { name: "Data Science", icon: Target, color: "from-green-400 to-emerald-500" },
              { name: "Mobile Apps", icon: Sparkles, color: "from-purple-400 to-violet-500" },
              { name: "AI/ML Projects", icon: Brain, color: "from-indigo-400 to-blue-500" },
              { name: "Research", icon: BookOpen, color: "from-cyan-400 to-teal-500" },
              { name: "And More...", icon: Star, color: "from-gray-400 to-gray-500" }
            ].map((domain, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 text-center group">
                <div className={`w-12 h-12 bg-gradient-to-r ${domain.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <domain.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium text-sm">{domain.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="w-full flex justify-center mt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Ready to Turn Learning into Building?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Stop letting great learning moments slip away. Get your personalized project suggestions in seconds.
              </p>
              
              <button
                onClick={() => navigate('/ai')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 focus:outline-none transform transition duration-300 flex items-center gap-3 mx-auto group"
              >
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Get My Project Ideas
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
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