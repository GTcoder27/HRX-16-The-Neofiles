import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Flame, Trophy, Eye, Plus, Users, GitBranch, FileText, Link, GitCommit, ArrowLeft, Clock, Target, CheckCircle, Circle } from 'lucide-react';
import { useFirebase } from '../context/Firebase.jsx';
import toast from 'react-hot-toast';

// Confetti component
const Confetti = () => {
  const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#7CFC00', '#FF4500', '#9400D3'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            top: '-10px',
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            opacity: 0,
            rotate: 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllDocuments, getData, putData } = useFirebase();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showGithubInput, setShowGithubInput] = useState(false);
  const [githubLink, setGithubLink] = useState('');
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(false);

  // Generate tasks based on project tags
  const generateTasks = (projectData) => {
    if (!projectData || !projectData.tags) return [];
    
    const baseTasks = [
      { id: 1, text: "Research and planning", completed: true },
      { id: 2, text: "Set up development environment", completed: true },
      { id: 3, text: "Create project structure", completed: true },
    ];

    const tagTasks = projectData.tags.map((tag, index) => ({
      id: index + 4,
      text: `Implement ${tag} functionality`,
      completed: false
    }));

    const finalTasks = [
      ...baseTasks,
      ...tagTasks,
      { id: tagTasks.length + 4, text: "Testing and debugging", completed: false },
      { id: tagTasks.length + 5, text: "Documentation", completed: false },
      { id: tagTasks.length + 6, text: "Deployment", completed: false }
    ];

    return finalTasks;
  };

  const tasks = project ? generateTasks(project) : [];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const result = await getAllDocuments('user_carts');
        if (result.success) {
          let foundProject = null;
          result.data.forEach(userCart => {
            if (userCart.projects && Array.isArray(userCart.projects)) {
              const projectFound = userCart.projects.find(p => p.id === parseInt(id));
              if (projectFound) {
                foundProject = projectFound;
              }
            }
          });
          
          if (foundProject) {
            setProject(foundProject);
            // Set initial completed tasks based on progress
            const totalTasks = generateTasks(foundProject).length;
            const completedCount = Math.floor((foundProject.progress || 0) / 100 * totalTasks);
            setCompletedTasks(Array.from({ length: completedCount }, (_, i) => i + 1));
          } else {
            navigate('/allprojects');
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        navigate('/allprojects');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, getAllDocuments, navigate]);

  const toggleTask = async (taskId) => {
    if (updatingTask) return; // Prevent multiple simultaneous updates
    
    setUpdatingTask(true);
    
    try {
      const newCompletedTasks = completedTasks.includes(taskId)
        ? completedTasks.filter(id => id !== taskId)
        : [...completedTasks, taskId];
      
      // Update local state immediately for better UX
      setCompletedTasks(newCompletedTasks);
      
      // Calculate new progress
      const newProgress = Math.round((newCompletedTasks.length / tasks.length) * 100);
      
      // Find the user who owns this project
      const result = await getAllDocuments('user_carts');
      if (result.success) {
        let projectOwner = null;
        let userCart = null;
        
        result.data.forEach(userCartData => {
          if (userCartData.projects && Array.isArray(userCartData.projects)) {
            const projectFound = userCartData.projects.find(p => p.id === parseInt(id));
            if (projectFound) {
              projectOwner = userCartData.id; // This is the user's email
              userCart = userCartData;
            }
          }
        });
        
        if (projectOwner && userCart) {
          // Update the specific project in the user's cart
          const updatedProjects = userCart.projects.map(p => {
            if (p.id === parseInt(id)) {
              return {
                ...p,
                progress: newProgress,
                completedTasks: newCompletedTasks.length,
                totalTasks: tasks.length,
                status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'not_started'
              };
            }
            return p;
          });
          
          // Save updated projects to database
          const updateResult = await putData('user_carts', projectOwner, {
            ...userCart,
            projects: updatedProjects,
            lastUpdated: new Date().toISOString()
          });
          
          if (updateResult.success) {
            // Update local project state
            setProject(prev => ({
              ...prev,
              progress: newProgress,
              completedTasks: newCompletedTasks.length,
              totalTasks: tasks.length,
              status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'not_started'
            }));
            
            // Show success toast
            const wasCompleted = completedTasks.includes(taskId);
            toast.success(`Task ${wasCompleted ? 'unchecked' : 'completed'}! Progress: ${newProgress}%`);
          } else {
            // Revert local state if database update failed
            setCompletedTasks(completedTasks);
            console.error('Failed to update task in database');
            toast.error('Failed to update task. Please try again.');
          }
        }
      }
    } catch (error) {
      // Revert local state if there was an error
      setCompletedTasks(completedTasks);
      console.error('Error updating task:', error);
      toast.error('Error updating task. Please try again.');
    } finally {
      setUpdatingTask(false);
    }
  };

  useEffect(() => {
    if (completedTasks.length === tasks.length && !isRated) {
      setShowGithubInput(true);
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    } else if (completedTasks.length < tasks.length) {
      setShowGithubInput(false);
    }
  }, [completedTasks.length, isRated, tasks.length]);

  const handleGithubSubmit = (e) => {
    e.preventDefault();
    if (githubLink.trim()) {
      const randomRating = Math.floor(Math.random() * 3) + 3;
      setRating(randomRating);
      setIsRated(true);
      setShowGithubInput(false);
    }
  };

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty) {
      case 'Advanced':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-300',
          icon: '🔥'
        };
      case 'Intermediate':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-300',
          icon: '⚡'
        };
      default:
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-300',
          icon: '🌱'
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-300',
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Completed'
        };
      case 'in_progress':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-300',
          icon: <Play className="w-4 h-4" />,
          label: 'In Progress'
        };
      default:
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/30',
          text: 'text-slate-300',
          icon: <Circle className="w-4 h-4" />,
          label: 'Not Started'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Project not found</p>
        </div>
      </div>
    );
  }

  const difficultyConfig = getDifficultyConfig(project.difficulty);
  const statusConfig = getStatusConfig(project.status);
  const progress = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 relative overflow-y-auto w-full">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-4 sm:px-0">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => navigate('/allprojects')}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Project Details</h1>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.border} border ${statusConfig.text}`}>
              {statusConfig.icon}
              {progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-medium">{Math.floor(Math.random() * 5000)} XP</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Status Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex flex-col w-full items-start">
                  <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">{project.title}</h2>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  
                  <div className="w-full mx-auto bg-gray-700 rounded-full h-2.5 my-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${difficultyConfig.bg} ${difficultyConfig.border} border ${difficultyConfig.text}`}>
                      <span>{difficultyConfig.icon}</span>
                      {project.difficulty}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{project.duration}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {(project.tags || []).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-200 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-400">{Math.round(progress)}%</div>
                  <div className="text-gray-300">{completedTasks.length}/{tasks.length} tasks</div>
                </div>
              </div>
            </div>

            {/* Task Checklist */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Task Checklist</span>
                {updatingTask && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                )}
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {tasks.map((task) => {
                  const isCompleted = completedTasks.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center space-x-3 cursor-pointer group ${updatingTask ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-400 group-hover:border-gray-300'
                          }`}
                      >
                        {isCompleted && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span
                        className={`transition-colors ${isCompleted
                            ? 'line-through text-gray-400'
                            : 'text-white group-hover:text-gray-200'
                          }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Performance Rating */}
            <div className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 h-64 flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold">Performance Rating</h3>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                {isRated ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">{rating.toFixed(1)}</div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">
                      {rating >= 4.5
                        ? 'Outstanding work! Your project is exceptional! 🎉'
                        : rating >= 4
                          ? 'Great job! Your project is well done! 👏'
                          : rating >= 3
                            ? 'Good work! Keep it up! 👍'
                            : 'Thanks for submitting! Keep improving! 💪'}
                    </p>
                  </div>
                ) : showGithubInput ? (
                  <form onSubmit={handleGithubSubmit} className="space-y-3">
                    <p className="text-gray-300 text-sm mb-2 text-center">
                      Completed your project? Submit the GitHub link and we'll rate it for you! 🚀
                    </p>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="url"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        placeholder="https://github.com/username/repo"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Star className="w-4 h-4" />
                        <span>Get Your Rating</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-500 mb-2">0.0</div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-5 h-5 text-gray-600" />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">Complete all tasks to get rated</p>
                  </div>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-4">Project Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Added:</span>
                  <span className="text-white">{new Date(project.addedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created by:</span>
                  <span className="text-white">{project.userEmail ? project.userEmail.split('@')[0] : 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 