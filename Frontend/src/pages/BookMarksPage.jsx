import React, { useState, useEffect } from 'react';
import {
  Heart, Clock, Target, Eye, Share2, Trophy, ChevronRight,
  Database, Globe, Smartphone, Lightbulb, Sparkles, Star, Zap, Code, Palette, Rocket,
  BookOpen, Filter, Search, X, ArrowLeft, Trash2, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, index, onRemoveBookmark }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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
              onClick={() => onRemoveBookmark(project.id)}
              className="p-2 rounded-xl border bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-200"
              title="Remove bookmark"
            >
              <Trash2 className="w-4 h-4" />
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
        </div>

        {/* Preview section */}
        {showPreview && project.quickpreview && (
          <div className="mt-6 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Quick Preview
            </h4>
            <div className="space-y-2 text-sm text-slate-300 text-left">
              {project.quickpreview.map((preview, idx) => (
                <p key={idx} className="text-left">
                  {preview}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Bookmark date */}
        <div className="mt-4 pt-4 border-t border-slate-700/30">
          <p className="text-slate-400 text-xs">
            Bookmarked on {new Date(project.bookmarkedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default function BookmarksPage() {
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    const loadBookmarks = async () => {
      setIsLoading(true);
      
      // This would be your actual API call
      // const response = await fetch('/api/bookmarks');
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockBookmarks = [
        {
          id: 1,
          title: "AI-Powered Chat Application",
          description: "Build a real-time chat application with AI-powered message suggestions and sentiment analysis.",
          difficulty: "Advanced",
          tags: ["React", "Node.js", "WebSocket", "AI", "NLP"],
          estimatedTime: "3-4 weeks",
          category: "AI/ML",
          quickpreview: [
            "Set up real-time WebSocket connections",
            "Integrate AI for message suggestions",
            "Implement sentiment analysis features"
          ],
          bookmarkedAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "E-commerce Mobile App",
          description: "Create a full-featured mobile e-commerce application with payment integration and user authentication.",
          difficulty: "Intermediate",
          tags: ["React Native", "Firebase", "Stripe", "Redux"],
          estimatedTime: "2-3 weeks",
          category: "Mobile",
          quickpreview: [
            "Design responsive mobile UI",
            "Implement secure payment processing",
            "Add user authentication system"
          ],
          bookmarkedAt: "2024-01-10T14:20:00Z"
        },
        {
          id: 3,
          title: "Data Visualization Dashboard",
          description: "Build an interactive dashboard for data visualization with charts, graphs, and real-time updates.",
          difficulty: "Beginner",
          tags: ["D3.js", "Chart.js", "JavaScript", "HTML5"],
          estimatedTime: "1-2 weeks",
          category: "Data Science",
          quickpreview: [
            "Create interactive charts and graphs",
            "Implement real-time data updates",
            "Design responsive dashboard layout"
          ],
          bookmarkedAt: "2024-01-05T09:15:00Z"
        }
      ];
      
      setTimeout(() => {
        setBookmarkedProjects(mockBookmarks);
        setFilteredProjects(mockBookmarks);
        setIsLoading(false);
      }, 1000);
    };

    loadBookmarks();
  }, []);

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = bookmarkedProjects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty);
    }

    setFilteredProjects(filtered);
  }, [bookmarkedProjects, searchTerm, selectedCategory, selectedDifficulty]);

  const handleRemoveBookmark = (projectId) => {
    // This would be your API call to remove bookmark
    // await fetch(`/api/bookmarks/${projectId}`, { method: 'DELETE' });
    
    setBookmarkedProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  const categories = ['All', 'AI/ML', 'Full Stack', 'Mobile', 'Data Science', 'Web Development'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">Your Learning Collection</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Bookmarked Projects
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your curated collection of inspiring projects to tackle next
          </p>
        </div>

        {/* Filters and Search */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty} className="bg-slate-800">
                    {difficulty}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl text-red-300 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400/50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300">Loading your bookmarks...</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-4">
                {bookmarkedProjects.length === 0 ? 'No bookmarks yet' : 'No projects match your filters'}
              </h3>
              <p className="text-gray-400 mb-8">
                {bookmarkedProjects.length === 0 
                  ? 'Start exploring and bookmark projects that inspire you!'
                  : 'Try adjusting your search or filters to find more projects.'}
              </p>
              {bookmarkedProjects.length === 0 ? (
                <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                onClick={() => { navigate('/ai');}}>
                  Explore Projects
                </button>
              ) : (
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'} Found
                </h2>
                <div className="text-sm text-gray-400">
                  {bookmarkedProjects.length} total bookmarks
                </div>
              </div>

              <div className="grid gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onRemoveBookmark={handleRemoveBookmark}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

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
      `}</style>
    </div>
  );
}