import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Clock, Target, Eye, Star, Search, Filter, Grid, List,
  Play, CheckCircle, BarChart3, Loader, Lightbulb, Zap, Code, Smartphone, 
  Database, Globe, Palette, ChevronDown, X, SlidersHorizontal, Clock3, Circle, User, Award, Plus, ExternalLink
} from 'lucide-react';

const ProjectCard = ({ project, onProgressClick, isUpdating }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
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
              <p className="text-slate-400 text-sm">{project.category}</p>
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
          <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg border border-slate-700/30 flex-1">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-medium">{project.duration}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <User className="w-4 h-4 text-purple-400" />
            <span className="text-white text-sm font-medium">{getUserDisplayName(project.userEmail)}</span>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Preview */}
        {showPreview && project.description && (
          <div className="mb-4 p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Project Details
            </h4>
            <div className="space-y-1 text-xs text-slate-300">
              <p>• Category: {project.category}</p>
              <p>• Difficulty: {project.difficulty}</p>
              <p>• Duration: {project.duration}</p>
              <p>• Created by: {getUserDisplayName(project.userEmail)}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            Details
          </button>
          
          <button
            onClick={() => onProgressClick(project)}
            disabled={isUpdating}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
              project.status === 'completed'
                ? 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95'
            }`}
          >
            {isUpdating ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : project.status === 'completed' ? (
              <>
                <Award className="w-4 h-4" />
                View Project
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to My Projects
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const AllProjectsPage = () => {
  const { authUser, getData, putData, getAllDocuments } = useFirebase();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingProject, setUpdatingProject] = useState(null);

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
        setFilteredProjects([]);
        return;
      }

      try {
        // Get only the logged-in user's cart
        const result = await getData('user_carts', authUser.email);
        
        if (result.success && result.data && result.data.projects) {
          setProjects(result.data.projects);
          setFilteredProjects(result.data.projects);
        } else {
          // No projects found for user
          setProjects([]);
          setFilteredProjects([]);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [getData, authUser]);

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty);
    }

    if (selectedStatus !== 'All') {
      const statusMap = {
        'Not Started': 'not_started',
        'In Progress': 'in_progress',
        'Completed': 'completed'
      };
      filtered = filtered.filter(project => project.status === statusMap[selectedStatus]);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory, selectedDifficulty, selectedStatus]);

  const handleProgressClick = async (project) => {
    if (!authUser?.email) {
      alert('Please log in to add projects to your cart');
      return;
    }

    setUpdatingProject(project.id);
    
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
        setUpdatingProject(null);
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
      } else {
        alert('Failed to add project. Please try again.');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    } finally {
      setUpdatingProject(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                My Projects
              </h1>
              <p className="text-slate-400">
                View and manage your personal project collection
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 w-80"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>

              <div className="flex bg-slate-800/50 border border-slate-600/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

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
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        {showFilters && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Filters</h3>
              <button onClick={clearFilters} className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 appearance-none"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Difficulty</label>
                <div className="relative">
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 appearance-none"
                  >
                    {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 appearance-none"
                  >
                    {statuses.map(stat => <option key={stat} value={stat}>{stat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onProgressClick={handleProgressClick}
                isUpdating={updatingProject === project.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              {projects.length === 0 ? 'No Projects Available' : 'No Projects Found'}
            </h3>
            <p className="text-slate-400">
              {projects.length === 0 
                ? 'No projects have been added to the community yet. Be the first to add a project!'
                : 'Try adjusting your search or filters.'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllProjectsPage;