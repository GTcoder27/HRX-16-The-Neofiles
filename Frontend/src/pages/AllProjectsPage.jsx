import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Clock, Target, Star, Search, Filter, Grid, List,
  Play, CheckCircle, BarChart3, Loader, Lightbulb, Zap, Code, Smartphone, 
  Database, Globe, Palette, ChevronDown, X, SlidersHorizontal, Clock3, Circle, User, Award, Plus, ExternalLink,
  Flame, Trophy, Users as UsersIcon, GitBranch, FileText, GitCommit, ArrowLeft
} from 'lucide-react';

const ProjectCard = ({ project, onProgressClick, isUpdating }) => {
  const navigate = useNavigate();

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
      case 'Blockchain':
        return { icon: <Palette className="w-4 h-4" />, color: 'text-pink-400', bg: 'bg-pink-500/20' };
      default:
        return { icon: <Palette className="w-4 h-4" />, color: 'text-pink-400', bg: 'bg-pink-500/20' };
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
          icon: <Clock3 className="w-4 h-4" />,
          label: 'Not Started'
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(project.difficulty);
  const categoryConfig = getCategoryConfig(project.category);
  const statusConfig = getStatusConfig(project.status);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getUserDisplayName = (email) => {
    return email ? email.split('@')[0].replace(/\./g, ' ') : 'Unknown';
  };

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on a button or link inside the card
    if (e.target.closest('button, a')) {
      return;
    }
    // Navigate to the project details page
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div 
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/70 via-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
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
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.border} border ${statusConfig.text}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-slate-400 text-sm text-left">{project.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Progress</span>
            <span className="text-sm font-semibold text-cyan-400">{project.progress || 0}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-400">{project.completedTasks || 0}/{project.totalTasks || 0} tasks</span>
            <span className="text-xs text-slate-400">Added {formatDate(project.addedAt)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-200 rounded-lg text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {(project.tags || []).length > 3 && (
              <span className="px-2 py-1 bg-slate-700/50 border border-slate-600/30 text-slate-400 rounded-lg text-xs">
                +{(project.tags || []).length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg border border-slate-700/30 w-fit">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-medium">{project.duration}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            Details
          </button>
          

        </div>
      </div>
    </motion.div>
  );
};

const AllProjectsPage = () => {
  const { authUser, getData, putData, getAllDocuments } = useFirebase();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: [],
    category: [],
    status: []
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const firebase = useFirebase();
  const navigate = useNavigate();

  // Confetti effect state
  const [showCelebration, setShowCelebration] = useState(false);

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

  const categories = ['All', 'AI/ML', 'Full Stack', 'Mobile', 'Data Science', 'Web Development', 'Blockchain'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['All', 'Not Started', 'In Progress', 'Completed'];

  // Load user's projects from Firebase
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      if (!authUser?.email) {
        setLoading(false);
        setProjects([]);
        return;
      }

      try {
        // Get only the logged-in user's cart
        const result = await getData('user_carts', authUser.email);
        
        if (result.success && result.data && result.data.projects) {
          setProjects(result.data.projects);
        } else {
          // No projects found for user
          setProjects([]);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [getData, authUser]);

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(project => filters.difficulty.includes(project.difficulty));
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter(project => filters.category.includes(project.category));
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(project => filters.status.includes(project.status));
    }

    // Sort projects
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Update projects state
    setProjects(filtered);
  }, [projects, searchQuery, filters, sortBy]);

  const handleProgressClick = async (project) => {
    if (!authUser?.email) {
      alert('Please log in to add projects to your cart');
      return;
    }

    try {
      // Get user's existing cart
      const userCartResult = await getData('user_carts', authUser.email);
      
      let userProjects = [];
      if (userCartResult.success && userCartResult.data && userCartResult.data.projects) {
        userProjects = userCartResult.data.projects;
      }

      // Check if project already exists in user's cart
      const existingProject = userProjects.find(p => p.id === project.id);
      if (existingProject) {
        alert('Project already in your cart!');
        return;
      }

      // Add project to user's cart
      const updatedProjects = [...userProjects, {
        ...project,
        addedAt: new Date().toISOString(),
        userEmail: authUser.email,
        progress: 0,
        status: 'not_started',
        completedTasks: 0
      }];

      const updateResult = await putData('user_carts', authUser.email, {
        projects: updatedProjects,
        lastUpdated: new Date().toISOString(),
        userEmail: authUser.email
      });

      if (updateResult.success) {
        alert(`"${project.title}" added to your projects!`);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      } else {
        alert('Failed to add project. Please try again.');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      difficulty: [],
      category: [],
      status: []
    });
  };

  const getProjectStats = () => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const inProgress = projects.filter(p => p.status === 'in_progress').length;
    const notStarted = projects.filter(p => p.status === 'not_started').length;
    
    return { total, completed, inProgress, notStarted };
  };

  const stats = getProjectStats();

  if (loading) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-5 -z-10"></div>
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
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className=" text-left pb-2 text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                All Projects
              </h1>
              <p className="text-slate-400 mt-2 text-lg">Browse and manage your learning journey</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <motion.div 
                className="relative flex-1 md:min-w-[300px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white placeholder-slate-500 transition-all duration-300"
                />
              </motion.div>

              

              <motion.div 
                className="flex border border-slate-700/50 rounded-xl overflow-hidden bg-slate-800/70 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400' 
                      : 'bg-transparent text-slate-400 hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400' 
                      : 'bg-transparent text-slate-400 hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-sm text-slate-400">Total Projects</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.completed}</p>
                  <p className="text-sm text-slate-400">Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
                  <p className="text-sm text-slate-400">In Progress</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-500/20 rounded-lg">
                  <Circle className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.notStarted}</p>
                  <p className="text-sm text-slate-400">Not Started</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="mb-8 p-6 bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl shadow-slate-900/30"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Filters</h3>
                <motion.button
                  onClick={() => setShowFilters(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    Difficulty
                  </h4>
                  <div className="space-y-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
                      const isActive = filters.difficulty.includes(level);
                      return (
                        <motion.div 
                          key={level}
                          className={`flex items-center p-2 rounded-xl transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                              : 'hover:bg-slate-700/50 border border-transparent'
                          }`}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              difficulty: prev.difficulty.includes(level)
                                ? prev.difficulty.filter((d) => d !== level)
                                : [...prev.difficulty, level],
                            }))
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                            isActive 
                              ? 'bg-cyan-500/20 border-cyan-500/50' 
                              : 'border-slate-600 bg-slate-700/50'
                          }`}>
                            {isActive && <CheckCircle className="w-3 h-3 text-cyan-400" />}
                          </div>
                          <span className="text-slate-300">{level}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-400" />
                    Category
                  </h4>
                  <div className="space-y-3">
                    {['Web Development', 'Mobile', 'AI/ML', 'Data Science', 'Blockchain', 'Full Stack'].map((category) => {
                      const isActive = filters.category.includes(category);
                      return (
                        <motion.div 
                          key={category}
                          className={`flex items-center p-2 rounded-xl transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                              : 'hover:bg-slate-700/50 border border-transparent'
                          }`}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              category: prev.category.includes(category)
                                ? prev.category.filter((c) => c !== category)
                                : [...prev.category, category],
                            }))
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                            isActive 
                              ? 'bg-cyan-500/20 border-cyan-500/50' 
                              : 'border-slate-600 bg-slate-700/50'
                          }`}>
                            {isActive && <CheckCircle className="w-3 h-3 text-cyan-400" />}
                          </div>
                          <span className="text-slate-300">{category}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    Status
                  </h4>
                  <div className="space-y-3">
                    {['Not Started', 'In Progress', 'Completed'].map((status) => {
                      const isActive = filters.status.includes(status);
                      return (
                        <motion.div 
                          key={status}
                          className={`flex items-center p-2 rounded-xl transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                              : 'hover:bg-slate-700/50 border border-transparent'
                          }`}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              status: prev.status.includes(status)
                                ? prev.status.filter((s) => s !== status)
                                : [...prev.status, status],
                            }))
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                            isActive 
                              ? 'bg-cyan-500/20 border-cyan-500/50' 
                              : 'border-slate-600 bg-slate-700/50'
                          }`}>
                            {isActive && <CheckCircle className="w-3 h-3 text-cyan-400" />}
                          </div>
                          <span className="text-slate-300">{status}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50 flex justify-between items-center">
                <motion.button
                  onClick={() =>
                    setFilters({
                      difficulty: [],
                      category: [],
                      status: []
                    })
                  }
                  className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-all rounded-xl hover:bg-slate-700/50 border border-slate-700/50 flex items-center gap-2"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </motion.button>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowFilters(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-all rounded-xl hover:bg-slate-700/50 border border-slate-700/50"
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid/List */}
        {projects.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onProgressClick={handleProgressClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Projects Found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllProjectsPage;