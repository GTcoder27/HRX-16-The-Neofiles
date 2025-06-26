import React, { useState } from 'react';
import { Lightbulb, Sun, Moon, User, Menu, X } from 'lucide-react';

export default function Header(){
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home'); // Added this line to fix the error

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Profile', href: '/profile' }
  ];

  const handleNavClick = (pageName) => {
    setCurrentPage(pageName);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-[100%] bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Spark</span>
                <span className="text-white ml-1">Create</span>
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent ml-1">Verse</span>
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Where curiosity meets creation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`text-sm lg:text-base font-medium transition-colors duration-200 hover:text-cyan-400 ${
                  currentPage === item.name
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="relative w-12 h-6 lg:w-14 lg:h-7 bg-slate-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                    isDarkMode ? 'translate-x-6 lg:translate-x-7' : 'translate-x-0'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-slate-700" />
                  ) : (
                    <Sun className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-yellow-500" />
                  )}
                </div>
                <div className="absolute top-1 right-1">
                  <Sun className={`w-3 h-3 lg:w-4 lg:h-4 transition-opacity duration-300 ${isDarkMode ? 'opacity-100 text-gray-400' : 'opacity-0'}`} />
                </div>
                <div className="absolute top-1 left-1">
                  <Moon className={`w-3 h-3 lg:w-4 lg:h-4 transition-opacity duration-300 ${!isDarkMode ? 'opacity-100 text-gray-400' : 'opacity-0'}`} />
                </div>
              </button>
            </div>

            {/* Profile Button */}
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 text-sm lg:text-base">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`text-base font-medium transition-colors duration-200 hover:text-cyan-400 text-left ${
                    currentPage === item.name
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};