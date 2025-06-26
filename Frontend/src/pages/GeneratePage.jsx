import React, { useState } from 'react';
import { Lightbulb, Upload, Sparkles, Star, Share, Loader, Zap, Code, Palette, Rocket } from 'lucide-react';

export default function GeneratePage() {
  const [concept, setConcept] = useState('');
  const [learningMaterial, setLearningMaterial] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (concept.trim() || learningMaterial.trim()) {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/generate-projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            concept: concept.trim(),
            learningMaterial: learningMaterial.trim()
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate projects');
        }

        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err.message);
        // Mock data for demonstration
        setProjects([
          {
            id: 1,
            title: "AI-Powered Interactive Dashboard",
            description: "Build a stunning real-time dashboard with machine learning insights, data visualization, and responsive design that adapts to any device.",
            difficulty: "Intermediate",
            tags: ["React", "D3.js", "Machine Learning", "WebSocket"],
            estimatedTime: "2-3 weeks",
            category: "Full Stack"
          },
          {
            id: 2,
            title: "Smart Recommendation Engine",
            description: "Create an intelligent recommendation system using collaborative filtering and deep learning to suggest personalized content to users.",
            difficulty: "Advanced",
            tags: ["Python", "TensorFlow", "Neural Networks", "API"],
            estimatedTime: "3-4 weeks",
            category: "AI/ML"
          },
          {
            id: 3,
            title: "Mobile-First Progressive Web App",
            description: "Develop a lightning-fast PWA with offline capabilities, push notifications, and seamless mobile experience.",
            difficulty: "Beginner",
            tags: ["JavaScript", "Service Workers", "PWA", "Mobile"],
            estimatedTime: "1-2 weeks",
            category: "Mobile"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const canGenerate = concept.trim() || learningMaterial.trim();

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Advanced':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'Intermediate':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default:
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI/ML':
        return <Zap className="w-4 h-4" />;
      case 'Full Stack':
        return <Code className="w-4 h-4" />;
      case 'Mobile':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-y-hidden w-[100%]">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">AI-Powered Project Generator</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Transform Ideas into Reality
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover personalized project ideas that match your interests and skill level. Let AI guide your learning journey.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Form Section */}
            <div className="p-6 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Curiosity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-bold text-white">What sparks your curiosity?</h2>
                      <p className="text-gray-300 text-sm">Share your interests and passions</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                      placeholder="Machine Learning, Web Development, Game Design, Mobile Apps..."
                      className="w-full h-32 lg:h-40 p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-transparent rounded-2xl text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {['AI & ML', 'Web Development', 'Mobile Apps', 'Data Science'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setConcept(concept + (concept ? ', ' : '') + tag)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 border border-white/20"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column - Learning Material */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-bold text-white">Have learning material?</h2>
                      <p className="text-gray-300 text-sm">Upload content for personalized suggestions</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      value={learningMaterial}
                      onChange={(e) => setLearningMaterial(e.target.value)}
                      placeholder="Paste video transcripts, lecture notes, articles, or any learning content here..."
                      className="w-full h-32 lg:h-40 p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-transparent rounded-2xl text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>AI will analyze your content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
                      <span>Get relevant project ideas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isLoading}
                  className={`inline-flex items-center gap-3 px-12 py-4 lg:px-16 lg:py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    canGenerate && !isLoading
                      ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-xl hover:shadow-cyan-500/25' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      <span>Generate Projects</span>
                    </>
                  )}
                </button>
                
                {!canGenerate && !isLoading && (
                  <p className="text-gray-400 mt-4 text-sm">
                    Fill in at least one field to unlock your potential ✨
                  </p>
                )}
              </div>
            </div>

            {/* Results Section */}
            {(projects.length > 0 || error) && (
              <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="p-6 lg:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">Your Personalized Projects</h3>
                  </div>
                  
                  {error && (
                    <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">!</span>
                        </div>
                        <div>
                          <p className="text-red-300 font-semibold">Connection Error</p>
                          <p className="text-red-200 text-sm">Showing demo projects while we reconnect...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                      <div 
                        key={project.id} 
                        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          {/* Project Info */}
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <h4 className="text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {project.title}
                              </h4>
                              <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getDifficultyStyle(project.difficulty)}`}>
                                  {getCategoryIcon(project.category)}
                                  {project.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, tagIndex) => (
                                  <span 
                                    key={tagIndex} 
                                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all cursor-default"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              
                              {project.estimatedTime && (
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                  <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  </div>
                                  <span>{project.estimatedTime}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex-shrink-0">
                            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
                              <span>Start Project</span>
                              <Rocket className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Features Section */}
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
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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
  );
}