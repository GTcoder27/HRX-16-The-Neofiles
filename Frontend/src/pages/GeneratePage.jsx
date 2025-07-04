import React, { useState, useRef } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import {
  Heart, Clock, Target, Mic, Youtube, Link, MicOff, Play, ArrowRight, Eye, Share2, Trophy, ChevronRight,
  GitBranch, Database, Globe, Smartphone, Loader, Lightbulb, Upload, Sparkles, Star, Share, Zap, Code, Palette, Rocket,
  ShoppingCart, Check
} from 'lucide-react';
import toast from "react-hot-toast";
import axios from 'axios';



const ProjectCard = ({ project, index }) => {
  const { authUser, putData, getData } = useFirebase();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [savedProjects, setSavedProjects] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [error, setError] = useState('');

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty) {
      case 'Advanced':
        return {
          gradient: 'from-red-500 via-pink-500 to-purple-600',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-300',
          icon: '🔥'
        };
      case 'Intermediate':
        return {
          gradient: 'from-yellow-400 via-orange-500 to-red-500',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-300',
          icon: '⚡'
        };
      default:
        return {
          gradient: 'from-green-400 via-emerald-500 to-teal-600',
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-300',
          icon: '🌱'
        };
    }
  };

  const getCategoryConfig = (category) => {
    switch (category) {
      case 'AI/ML':
        return { icon: <Zap className="w-4 h-4" />, color: 'text-purple-400', bg: 'bg-purple-500/20' };
      case 'Full Stack':
        return { icon: <Code className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'Mobile':
        return { icon: <Smartphone className="w-4 h-4" />, color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'Data Science':
        return { icon: <Database className="w-4 h-4" />, color: 'text-cyan-400', bg: 'bg-cyan-500/20' };
      case 'Web Development':
        return { icon: <Globe className="w-4 h-4" />, color: 'text-orange-400', bg: 'bg-orange-500/20' };
      default:
        return { icon: <Palette className="w-4 h-4" />, color: 'text-pink-400', bg: 'bg-pink-500/20' };
    }
  };

  const difficultyConfig = getDifficultyConfig(project.difficulty);
  const categoryConfig = getCategoryConfig(project.category);
  const hasQuickPreview = Array.isArray(project['quick-preview']) && project['quick-preview'].length > 0;

  const handleAddToCart = async () => {
    if (!authUser) {
      toast.error('Please login to add projects to cart');
      return;
    }

    if (isAdding || isInCart) return;

    setIsAdding(true);
    setError('');

    try {
      // First, get existing projects from user's cart
      const existingCartResult = await getData('user_carts', authUser.email);
      
      let existingProjects = [];
      if (existingCartResult && existingCartResult.data && existingCartResult.data.projects) {
        existingProjects = existingCartResult.data.projects;
      }

      // Check if project already exists
      const projectExists = existingProjects.some(p => p.title === project.title);
      if (projectExists) {
        toast.error('Project already in your cart!');
        setIsInCart(true);
        setIsAdding(false);
        return;
      }

      const cartItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
        title: project.title,
        category: project.category,
        difficulty: project.difficulty,
        estimatedTime: project.estimatedTime,
        description: project.description,
        tags: project.tags || [],
        addedAt: new Date().toISOString(),
        userEmail: authUser.email,
        progress: 0,
        status: 'not_started',
        totalTasks: project.tags ? project.tags.length + 2 : 5,
        completedTasks: 0
      };

      // Add new project to existing projects
      const updatedProjects = [...existingProjects, cartItem];

      const result = await putData('user_carts', authUser.email, {
        projects: updatedProjects,
        lastUpdated: new Date().toISOString(),
        userEmail: authUser.email
      });

      if (result && result.success) {
        setIsInCart(true);
        toast.success('Project added successfully!');
      } else {
        throw new Error('Failed to save to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error(error.message || 'Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Header with actions */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${categoryConfig.bg} border border-slate-600/30`}>
              <div className={categoryConfig.color}>
                {categoryConfig.icon}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${difficultyConfig.bg} ${difficultyConfig.border} border ${difficultyConfig.text}`}>
                  <span>{difficultyConfig.icon}</span>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-slate-400 text-sm text-left">{project.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-xl border transition-all duration-200 ${isLiked
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-slate-800/50 border-slate-600/30 text-slate-400 hover:text-red-400'
                }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl border transition-all duration-200 ${isBookmarked
                ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                : 'bg-slate-800/50 border-slate-600/30 text-slate-400 hover:text-yellow-400'
                }`}
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Project title and description */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        {/* Enhanced tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-200 rounded-xl text-sm font-medium backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/40 transition-all cursor-default hover:scale-105"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats and metadata */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30 flex-1">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide text-left">Duration</p>
              <p className="text-white font-semibold">{project.estimatedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30 flex-1">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide text-left">Level</p>
              <p className="text-white font-semibold">{project.difficulty}</p>
            </div>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group/preview flex items-center justify-center w-20"
            title={showPreview ? 'Hide preview' : 'Show preview'}
          >
            <Eye className="w-5 h-5 group-hover/preview:scale-110 transition-transform" />
          </button>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              disabled={isInCart || isAdding}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${isInCart
                ? 'bg-green-500/20 border border-green-500/30 text-green-400 cursor-default'
                : isAdding
                  ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 cursor-wait'
                  : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-98'
                }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Projects
                </>
              ) : isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Projects
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview section */}
        {showPreview && (
          <div className="mt-6 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Quick Preview
            </h4>
            <div className="space-y-2 text-sm text-slate-300 text-left">
              {
                project.quickpreview.map((preview, idx) => (
                  <p key={idx} className="text-left">
                    {preview}
                  </p>
                ))
              }
            </div>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default function GeneratePage() {
  const [concept, setConcept] = useState('');
  const [youtubelink, setYoutubelink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const projectSectionRef = useRef(null);


  const canGenerate = concept.trim() || youtubelink.trim();

  const handleGenerate = async () => {
    if (concept.trim() || youtubelink.trim()) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:3000/api/DIYmodel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic: concept.trim(),
            youtubelink: youtubelink.trim()
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate projects');
        }

        const data = await response.json();
        console.log(data);

        const formattedProjects = (data).map((project, index) => ({
          id: index + 1,
          title: project.title,
          description: project.description,
          difficulty: project.difficulty,
          tags: project.tags,
          quickpreview: project.quickpreview,
          estimatedTime: project.estimatedTime,
          category: project.category
        }));

        setProjects(formattedProjects);
        setTimeout(() => {
          projectSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        console.log(projects);
      }
      catch (err) {
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        setAudioChunks(chunks);
        handleTranscription(chunks);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      toast.error("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // remove data:*/*;base64,
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleTranscription = async (chunks) => {
    const audioBlob = new Blob(chunks, { type: "audio/flac" });
    let base64 = await blobToBase64(audioBlob);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/speech_to_text",
        { base64 }
      );

      const transcript = response.data?.pipelineResponse?.[0]?.output?.[0].source || "";
      console.log(transcript);

      if (transcript) {
        let temp = concept;
        setConcept(temp + transcript);
      }
      else {
        toast.error("No transcript found.");
      }
    } catch (err) {
      console.error("Transcription failed:", err);
      toast.error("Transcription failed");
    }
  };

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
          <h1 className="text-4xl lg:text-6xl p-3 font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
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
                    <div className="relative">
                      <textarea
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerate();
                          }
                          // If Shift + Enter, let the default behavior insert a newline
                        }}
                        placeholder="Machine Learning, Web Development, Game Design, Mobile Apps..."
                        className="w-full h-28 sm:h-32 lg:h-40 p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-transparent rounded-2xl text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 group-hover:shadow-lg text-sm sm:text-base"
                      />

                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                      {/* Voice Recording Button */}
                      <button
                        type="button"
                        className=" absolute bottom-3 right-3 rounded-full m-0 p-2 focus:outline-none focus:border-none"
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        {isRecording ? <MicOff size={20} className="text-red-500" /> : <Mic size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Quick Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['AI & ML', 'Web Development', 'Mobile Apps', 'Data Science'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setConcept(concept + (concept ? ', ' : '') + tag)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 border border-white/20 text-white"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column - YouTube Link */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white break-words">
                        Have a YouTube video?
                      </h2>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Paste a YouTube link for personalized projects
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="relative">
                      <div className="flex items-center gap-3 p-4 sm:p-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-transparent rounded-2xl focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-400/20 transition-all duration-300 group-hover:shadow-lg">
                        <Link className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <input
                          type="url"
                          value={youtubelink}
                          onChange={(e) => setYoutubelink(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleGenerate();
                            }
                          }}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
                        />

                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isLoading}
                  className={`inline-flex items-center gap-3 px-12 py-4 lg:px-16 lg:py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${canGenerate && !isLoading
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

            {/* Enhanced Results Section with Project Cards */}
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

                  {/* Enhanced Project Cards Grid */}
                  <div className="grid gap-8" ref={projectSectionRef}>
                    {projects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            )}
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
  );
}