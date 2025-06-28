import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Flame, Trophy, Eye, Plus, Users, GitBranch, FileText, Link, GitCommit } from 'lucide-react';

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

export default function ProjectPage() {
  const [showCelebration, setShowCelebration] = useState(false);
  const tasks = [
    { id: 1, text: "Research IoT protocols", completed: true },
    { id: 2, text: "Design circuit schematic", completed: true },
    { id: 3, text: "Order components", completed: true },
    { id: 4, text: "Set up development environment", completed: true },
    { id: 5, text: "Write control firmware", completed: true },
    { id: 6, text: "Build housing", completed: false },
    { id: 7, text: "Integration testing", completed: false },
    { id: 8, text: "Documentation", completed: false },
    { id: 9, text: "User interface design", completed: false },
    { id: 10, text: "Final testing", completed: false }
  ];

  const [completedTasks, setCompletedTasks] = React.useState([1, 2, 3, 4, 5]); // Default first 5 tasks completed
  const [showGithubInput, setShowGithubInput] = React.useState(false);
  const [githubLink, setGithubLink] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [isRated, setIsRated] = React.useState(false);
  
  const toggleTask = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  React.useEffect(() => {
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
      // Generate a random rating between 3 and 5 for demo purposes
      const randomRating = Math.floor(Math.random() * 3) + 3;
      setRating(randomRating);
      setIsRated(true);
      setShowGithubInput(false);
    }
  };
  


  const weeklyProgress = [
    { day: 'M', active: true, completed: true },
    { day: 'T', active: true, completed: true },
    { day: 'W', active: true, completed: true },
    { day: 'T', active: true, completed: true },
    { day: 'F', active: true, completed: true },
    { day: 'S', active: false, completed: false },
    { day: 'S', active: false, completed: false }
  ];

  const topMakers = [
    { rank: 1, name: "Alex Chen", role: "AI Voice Assistant", score: 4521, avatar: "AC" },
    { rank: 2, name: "Maya Patel", role: "Renewable Energy Monitor", score: 4287, avatar: "MP" },
    { rank: 3, name: "Jordan Kim", role: "Automated Garden System", score: 3956, avatar: "JK" },
    { rank: 4, name: "You", role: "Smart Home IoT Controller", score: 2847, avatar: "Y", isUser: true }
  ];

  const nextProjects = [
    {
      title: "Voice-Controlled Assistant",
      difficulty: "Intermediate",
      duration: "3 weeks",
      tags: ["Python", "AI", "Hardware"],
      difficultyColor: "text-green-400"
    },
    {
      title: "Blockchain Voting System",
      difficulty: "Advanced", 
      duration: "4 weeks",
      tags: ["Solidity", "Web3", "React"],
      difficultyColor: "text-orange-400"
    },
    {
      title: "Autonomous Drone Navigation",
      difficulty: "Expert",
      duration: "6 weeks", 
      tags: ["C++", "Computer Vision", "Hardware"],
      difficultyColor: "text-red-400"
    }
  ];

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
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Grid Overlay */}
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
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Project Dashboard</h1>
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Active
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 font-medium">12 days streak</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-medium">2,847 XP</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
              18
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
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">Smart Home IoT Controller</h2>
                <div className="w-full mx-auto bg-gray-700 rounded-full h-2.5 my-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
                ></div>
              </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    In Progress
                  </span>
                  <span className="text-xs text-gray-400">Last updated: 2 hours ago</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-400">{Math.round((completedTasks.length / tasks.length) * 100)}%</div>
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
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {tasks.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <div 
                    key={task.id} 
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-400 group-hover:border-gray-300'
                      }`}
                    >
                      {isCompleted && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span 
                      className={`transition-colors ${
                        isCompleted 
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

          {/* Your Contributions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <GitBranch className="w-6 h-6" />
              <span>Your Contributions</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-600/30 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <GitBranch className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">iot-controller-v2</span>
                </div>
                <p className="text-gray-300 text-sm">GitHub Repository</p>
              </div>
              
              <div className="bg-purple-600/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Project Progress</span>
                  <span className="text-sm font-medium">{Math.round((completedTasks.length / tasks.length) * 100)}%</span>
                </div>
                <p className="text-gray-300 text-sm">Documentation</p>
              </div>
              
              <div className="bg-purple-600/30 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Link className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">8 resources</span>
                </div>
                <p className="text-gray-300 text-sm">External Links</p>
              </div>
              
              <div className="bg-purple-600/30 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <GitCommit className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">34 commits</span>
                </div>
                <p className="text-gray-300 text-sm">Code Commits</p>
              </div>
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
                  {[1,2,3,4,5].map(i => (
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
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-gray-600" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Complete all tasks to get rated</p>
              </div>
            )}
            </div>
          </div>

          {/* Weekly Streak */}
          <div className="bg-gradient-to-br from-orange-400/20 to-red-400/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30">
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="w-5 h-5 text-orange-400" />
              <h3 className="font-bold">Weekly Streak</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-orange-400 mb-2">12 Days</div>
              <p className="text-gray-300 text-sm mb-4">Keep it up!</p>
              <div className="flex justify-center space-x-2">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.completed ? 'bg-green-500 text-white' : 
                    day.active ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    {day.day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Makers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold">Top Makers This Week</h3>
            </div>
            <div className="space-y-3">
              {topMakers.map((maker) => (
                <div key={maker.rank} className={`flex items-center space-x-3 p-3 rounded-xl ${
                  maker.isUser ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-white/5'
                }`}>
                  <div className="text-lg font-bold text-gray-400 w-6">{maker.rank}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    maker.isUser ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {maker.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{maker.name}</div>
                    <div className="text-xs text-gray-400">{maker.role}</div>
                  </div>
                  <div className="font-bold text-sm">{maker.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
      </div>
    </div>
  );
}